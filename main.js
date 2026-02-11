const urlInput = document.getElementById('url-input');
const downloadBtn = document.getElementById('download-trigger');
const btnText = downloadBtn.querySelector('.btn-text');
const loader = document.getElementById('main-loader');
const resultSection = document.getElementById('result');

downloadBtn.addEventListener('click', () => {
    const url = urlInput.value.trim();

    if (!validateUrl(url)) {
        alert('올바른 인스타그램 주소를 입력해주세요.');
        return;
    }

    // Per user request, redirect to the external downloader service
    window.location.href = 'https://indown.io/reels/ko';
});

function validateUrl(url) {
    const igRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reels|reel|tv)\/([^\/?#&]+)/;
    return igRegex.test(url);
}

function setLoading(isLoading) {
    if (isLoading) {
        btnText.style.display = 'none';
        loader.style.display = 'block';
        downloadBtn.disabled = true;
        resultSection.style.display = 'none';
    } else {
        btnText.style.display = 'block';
        loader.style.display = 'none';
        downloadBtn.disabled = false;
    }
}

async function fetchMediaData(url) {
    // In a real scenario, you would use an API like RapidAPI or your own backend.
    // Here we simulate a successful fetch after a short delay for demonstration.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                type: 'video', // or 'image'
                previewUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop',
                downloadUrl: '#',
                title: 'Instagram Post'
            });
        }, 2000);
    });
}

function renderResult(data) {
    resultSection.innerHTML = `
        <div class="result-card">
            <div class="preview-container">
                <img src="${data.previewUrl}" alt="Preview">
            </div>
            <div class="result-info">
                <a href="${data.downloadUrl}" class="final-download-btn" target="_blank" download>파일 다운로드</a>
                <p style="text-align: center; font-size: 0.8rem; color: var(--text-muted);">
                    다운로드 버튼이 작동하지 않으면 이미지를 길게 누르거나 우클릭하여 저장하세요.
                </p>
            </div>
        </div>
    `;
    resultSection.style.display = 'block';

    // Smooth scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
