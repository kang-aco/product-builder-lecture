document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const recommendationText = document.querySelector('.recommendation');
    const recommendationImage = document.querySelector('.menu-image');
    const themeSwitch = document.getElementById('checkbox');

    const dinnerMenus = [
        '김치찌개', '된장찌개', '불고기', '비빔밥', '삼겹살',
        '치킨', '피자', '떡볶이', '파스타', '초밥',
        '카레', '짜장면', '짬뽕', '탕수육', '스테이크',
        '부대찌개', '닭갈비', '제육볶음', '갈비찜', '간장게장'
    ];

    const setTheme = (theme) => {
        document.body.classList.toggle('dark-theme', theme === 'dark');
        localStorage.setItem('theme', theme);
        themeSwitch.checked = (theme === 'dark');
    };

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    });

    const generateDinnerMenu = () => {
        const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
        return dinnerMenus[randomIndex];
    };

    const displayRecommendationWithAnimation = (menu, delay) => {
        // Hide both elements initially
        recommendationText.classList.add('hidden');
        recommendationImage.classList.add('hidden');
        recommendationText.style.transform = 'translateY(-20px) scale(0.9)';
        recommendationImage.style.transform = 'translateY(-20px) scale(0.9)';
        recommendationText.style.opacity = '0';
        recommendationImage.style.opacity = '0';

        setTimeout(() => {
            if (menu === '피자') {
                recommendationImage.classList.remove('hidden');
                recommendationText.classList.add('hidden');
                recommendationImage.style.transform = 'translateY(0) scale(1)';
                recommendationImage.style.opacity = '1';
            } else {
                recommendationText.classList.remove('hidden');
                recommendationImage.classList.add('hidden');
                recommendationText.textContent = menu;
                recommendationText.style.transform = 'translateY(0) scale(1)';
                recommendationText.style.opacity = '1';
            }
        }, delay);
    };

    generateBtn.addEventListener('click', () => {
        const recommendedMenu = generateDinnerMenu();
        displayRecommendationWithAnimation(recommendedMenu, 100); // Small delay for animation
    });

    // Initial state
    recommendationText.textContent = '오늘의 추천 메뉴';
    recommendationText.classList.remove('hidden');
    recommendationImage.classList.add('hidden');
    recommendationText.style.transform = 'translateY(0) scale(1)';
    recommendationText.style.opacity = '1';
});