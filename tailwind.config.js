/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#4A90E2',
                    blueLight: '#EBF5FF',
                    gold: '#F4C542',
                    goldHover: '#E8B44D',
                    green: '#27AE60',
                    dark: '#2C3E50',
                    text: '#333333',
                    bg: '#FAFAFA',
                    bgAlt: '#F5F7FA',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Fraunces', 'serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        }
    },
    plugins: [],
}
