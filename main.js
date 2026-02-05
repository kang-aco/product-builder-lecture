document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const lottoSets = document.querySelectorAll('.lotto-numbers');
    const themeSwitch = document.getElementById('checkbox');

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

    const generateLottoNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const displayNumberWithAnimation = (element, number, delay) => {
        setTimeout(() => {
            element.textContent = number;
            element.style.backgroundColor = getNumberColor(number);
            element.style.color = 'white';
            element.style.transform = 'translateY(0) scale(1)';
            element.style.opacity = '1';
        }, delay);
    };

    const getNumberColor = (number) => {
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#aaaaaa'; // Gray
        return '#b0d840'; // Green
    };

    generateBtn.addEventListener('click', () => {
        let totalDelay = 0;
        lottoSets.forEach((set, setIndex) => {
            const lottoNumbers = generateLottoNumbers();
            const numberElements = set.querySelectorAll('.number');

            numberElements.forEach((element, index) => {
                // Clear and hide previous numbers immediately
                element.textContent = '';
                element.style.transform = 'translateY(-20px) scale(0.9)';
                element.style.opacity = '0';

                // Display new numbers with staggered animation
                displayNumberWithAnimation(element, lottoNumbers[index], totalDelay);
                totalDelay += 50; // Increment delay for each number
            });
        });
    });

    // Initial state with animation (clears numbers and animates them in)
    let initialDelay = 0;
    lottoSets.forEach((set) => {
        const numberElements = set.querySelectorAll('.number');
        numberElements.forEach((element) => {
            setTimeout(() => {
                element.textContent = '';
                element.style.transform = 'translateY(0) scale(1)';
                element.style.opacity = '1';
            }, initialDelay);
            initialDelay += 50;
        });
    });
});