
<?php

// --- CONFIG ---
define('API_KEY', '4e6ce72197a44d77959225c16f1d5f6c'); // <-- REPLACE with your key
define('CACHE_DIR', __DIR__ . '/cache');
define('CACHE_TTL', 300); // seconds

// Ensure cache dir exists
if (!is_dir(CACHE_DIR)) {
    @mkdir(CACHE_DIR, 0755, true);
}

// Get params
$page     = isset($_GET['page']) ? intval($_GET['page']) : 1;
$pageSize = isset($_GET['pageSize']) ? intval($_GET['pageSize']) : 9;
$q        = isset($_GET['q']) ? trim($_GET['q']) : '';
$category = isset($_GET['category']) ? trim($_GET['category']) : '';
$country  = isset($_GET['country']) ? trim($_GET['country']) : 'us';

// Basic validation
if ($page < 1) $page = 1;
if ($pageSize < 1 || $pageSize > 100) $pageSize = 9;

// Build remote URL
if ($q !== '') {
    $endpoint = 'https://newsapi.org/v2/everything';
    $params = [
        'q' => $q,
        'page' => $page,
        'pageSize' => $pageSize,
        'sortBy' => 'publishedAt',
        'language' => 'en'
    ];
} else {
    $endpoint = 'https://newsapi.org/v2/top-headlines';
    $params = [
        'category' => $category ?: 'general',
        'country' => $country ?: 'us',
        'page' => $page,
        'pageSize' => $pageSize
    ];
}

$query = http_build_query($params);
$cacheKey = md5($endpoint . '?' . $query);
$cacheFile = CACHE_DIR . '/' . $cacheKey . '.json';

// Serve from cache if fresh
if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < CACHE_TTL)) {
    header('Content-Type: application/json; charset=utf-8');
    readfile($cacheFile);
    exit;
}

// Prepare curl
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $endpoint . '?' . $query);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'X-Api-Key: ' . API_KEY
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr = curl_error($ch);
curl_close($ch);

if ($response === false) {
    http_response_code(502);
    echo json_encode(['status' => 'error', 'message' => 'Upstream request failed: ' . $curlErr]);
    exit;
}

// validate JSON
$json = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    // respond with raw if non-JSON (rare)
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON from upstream']);
    exit;
}

// optional: normalize fields (NewsAPI usually returns status,totalResults,articles)
if ($httpCode >= 200 && $httpCode < 300) {
    // cache response
    @file_put_contents($cacheFile, json_encode($json));
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($json);
} else {
    http_response_code($httpCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['status' => 'error', 'message' => $json['message'] ?? 'Upstream error']);
}
