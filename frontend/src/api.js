// 添加: 导入 axios 库，用于发送 HTTP 请求
import axios from 'axios';

// 添加: 引入 Leaflet 库
import L from 'leaflet';

// 添加: 初始化地图
const map = L.map('map').setView([51.505, -0.09], 13); // 初始位置和缩放级别

// 添加: 添加 OpenStreetMap 图层
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// 添加: 定义一个标记用于显示用户位置
let userMarker = null;

// 添加: 获取用户当前位置的函数
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// 添加: 显示用户位置的函数
function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    if (userMarker) {
        map.removeLayer(userMarker);
    }

    userMarker = L.marker([latitude, longitude]).addTo(map);
    map.setView([latitude, longitude], 15); // 设置地图中心为用户当前位置并调整缩放级别
}

// 添加: 处理获取位置错误的函数
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

// 添加: 调用获取用户位置的函数
getUserLocation();

// 添加: 定义 DeepSeek API 的 base URL 和 API key
const BASE_URL = 'https://api.deepseek.com';
const API_KEY = 'sk-0eca6b25af694c398554b3251944f6b8'; // 替换为实际的 API key

// 添加: 定义调用 DeepSeek API 的函数
async function callDeepSeekAPI(messages) {
    try {
        const response = await axios.post(`${BASE_URL}/chat/completions`, {
            model: 'deepseek-chat',
            messages: messages,
            stream: false
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error calling DeepSeek API:', error);
        throw error;
    }
}

// 添加: 示例调用，发送问候消息
callDeepSeekAPI([
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello!" }
]).then(response => {
    console.log('Response from DeepSeek API:', response);
}).catch(error => {
    console.error('Failed to call DeepSeek API:', error);
});