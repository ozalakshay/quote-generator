const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Inspirational quotes database
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "motivation"
    },
    {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
        category: "life"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "dreams"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle",
        category: "inspiration"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
        category: "motivation"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill",
        category: "success"
    },
    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "action"
    },
    {
        text: "Don't let yesterday take up too much of today.",
        author: "Will Rogers",
        category: "wisdom"
    },
    {
        text: "You learn more from failure than from success. Don't let it stop you. Failure builds character.",
        author: "Unknown",
        category: "failure"
    },
    {
        text: "If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.",
        author: "Steve Jobs",
        category: "passion"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
        category: "belief"
    },
    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson",
        category: "destiny"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs",
        category: "authenticity"
    },
    {
        text: "Growth begins at the end of your comfort zone.",
        author: "Unknown",
        category: "growth"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb",
        category: "action"
    },
    {
        text: "Don't be afraid to give up the good to go for the great.",
        author: "John D. Rockefeller",
        category: "excellence"
    },
    {
        text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
        author: "Alan Watts",
        category: "change"
    },
    {
        text: "Success is walking from failure to failure with no loss of enthusiasm.",
        author: "Winston Churchill",
        category: "persistence"
    },
    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        category: "resilience"
    },
    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein",
        category: "opportunity"
    }
];

// Time-based thoughts
const timeBasedThoughts = {
    morning: [
        "Start your day with a grateful heart",
        "Every morning is a chance to start fresh",
        "The early bird catches the worm",
        "Today is full of possibilities",
        "Morning coffee and positive thoughts"
    ],
    afternoon: [
        "Keep pushing forward, you're doing great",
        "Take a moment to appreciate your progress",
        "The afternoon sun reminds us to stay bright",
        "Half the day is done, make the rest count",
        "Fuel your body and mind for the rest of the day"
    ],
    evening: [
        "Reflect on today's accomplishments",
        "Evening brings peace and tranquility",
        "Time to unwind and recharge",
        "Count your blessings from today",
        "Rest is just as important as work"
    ],
    night: [
        "Sweet dreams lead to sweet realities",
        "Rest well, tomorrow awaits",
        "The night sky reminds us of infinite possibilities",
        "Sleep is the best meditation",
        "Let go of today's worries"
    ]
};

// Helper function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Helper function to determine time of day
function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
}

// Helper function to get greeting
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get a random quote with time-based greeting
app.get('/api/quote', (req, res) => {
    const randomQuote = getRandomItem(quotes);
    const timeOfDay = getTimeOfDay();
    const greeting = getGreeting();
    const timeBasedThought = getRandomItem(timeBasedThoughts[timeOfDay]);
    
    res.json({
        quote: randomQuote,
        greeting: greeting,
        timeOfDay: timeOfDay,
        thought: timeBasedThought,
        timestamp: new Date().toISOString()
    });
});

// API endpoint to get quotes by category
app.get('/api/quotes/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filteredQuotes = quotes.filter(quote => quote.category === category);
    
    if (filteredQuotes.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
    }
    
    const randomQuote = getRandomItem(filteredQuotes);
    const timeOfDay = getTimeOfDay();
    const greeting = getGreeting();
    const timeBasedThought = getRandomItem(timeBasedThoughts[timeOfDay]);
    
    res.json({
        quote: randomQuote,
        greeting: greeting,
        timeOfDay: timeOfDay,
        thought: timeBasedThought,
        category: category,
        timestamp: new Date().toISOString()
    });
});

// API endpoint to get all categories
app.get('/api/categories', (req, res) => {
    const categories = [...new Set(quotes.map(quote => quote.category))];
    res.json(categories);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Time-based quotes API is ready!`);
});
