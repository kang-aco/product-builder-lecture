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

    const displayNumberWithAnimation = (element, number, index) => {
        setTimeout(() => {
            element.textContent = number;
            element.style.backgroundColor = getNumberColor(number);
            element.style.color = 'white';
            element.style.transform = 'translateY(0) scale(1)';
            element.style.opacity = '1';
        }, index * 50); // Stagger the animation
    };

    const getNumberColor = (number) => {
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#aaaaaa'; // Gray
        return '#b0d840'; // Green
    };

    generateBtn.addEventListener('click', () => {
        lottoSets.forEach((set, setIndex) => {
            const lottoNumbers = generateLottoNumbers();
            const numberElements = set.querySelectorAll('.number');
            numberElements.forEach((element, index) => {
                element.style.transform = 'translateY(-20px) scale(0.9)';
                element.style.opacity = '0';
                displayNumberWithAnimation(element, lottoNumbers[index], index + setIndex * 6);
            });
        });
    });

    // Initial state with animation
    lottoSets.forEach((set, setIndex) => {
        const numberElements = set.querySelectorAll('.number');
        numberElements.forEach((element, index) => {
            setTimeout(() => {
                element.textContent = '';
                element.style.transform = 'translateY(0) scale(1)';
                element.style.opacity = '1';
            }, (index + setIndex * 6) * 50);
        });
    });
});