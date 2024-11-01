/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "polar-night-0": "#2E3440", // Polar Night
                "polar-night-1": "#3B4252", // Polar Night
                "polar-night-2": "#434C5E", // Polar Night
                "polar-night-3": "#4C566A", // Polar Night
                "snow-storm-0": "#D8DEE9", // Snow Storm
                "snow-storm-1": "#E5E9F0", // Snow Storm
                "snow-storm-2": "#ECEFF4", // Snow Storm
                "frost-0": "#8FBCBB", // Frost
                "frost-1": "#88C0D0", // Frost
                "frost-2": "#81A1C1", // Frost
                "frost-3": "#5E81AC", // Frost
                "aurora-red": "#BF616A", // Aurora
                "aurora-orange": "#D08770", // Aurora
                "aurora-yellow": "#EBCB8B", // Aurora
                "aurora-green": "#A3BE8C", // Aurora
                "aurora-purple": "#B48EAD", // Aurora
            },
        },
    },
    plugins: [],
};
