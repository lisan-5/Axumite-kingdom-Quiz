const { useState, useEffect } = React;
const { render } = ReactDOM;

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">Ligator</div>
        </nav>
    );
}

function Register({ onRegister, onSwitchToLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = () => {
        if (username && password) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            onRegister(username);
        } else {
            alert('Please fill in both fields');
        }
    };

    return (
        <div>
            <div className="logo-container">
                <h1 className="logo">Ligator</h1>
            </div>
            <div className="auth-container mt-5">
                <div className="auth-header">
                    <h2>Hello</h2>
                    <p>Create an account to start quizzing</p>
                </div>
                <div className="auth-form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
                <button className="auth-btn" onClick={handleRegister}>
                    Register
                </button>
                <a className="auth-link" onClick={onSwitchToLogin}>
                    Already have an account? Login
                </a>
            </div>
            <Footer />
        </div>
    );
}

function Login({ onLogin, onSwitchToRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        if (username === storedUsername && password === storedPassword) {
            onLogin(username);
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div>
            <div className="logo-container">
                <h1 className="logo">Ligator</h1>
            </div>
            <div className="auth-container mt-5">
                <div className="auth-header">
                    <h2>Welcome Back!</h2>
                    <p>Login to continue</p>
                </div>
                <div className="auth-form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="auth-form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
                <button className="auth-btn" onClick={handleLogin}>
                    Login
                </button>
                <a className="auth-link" onClick={onSwitchToRegister}>
                    New here? Register
                </a>
            </div>
            <Footer />
        </div>
    );
}

function Timer({ timeLeft, totalTime }) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const progress = (timeLeft / totalTime) * circumference;

    let timeState = 'time-high';
    const percentage = (timeLeft / totalTime) * 100;
    if (percentage <= 20) {
        timeState = 'time-low';
    } else if (percentage <= 50) {
        timeState = 'time-medium';
    }

    return (
        <div className="timer-container">
            <svg className="timer-svg" viewBox="0 0 120 120">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                        <stop offset="0%" stopColor="#6f42c1" />
                        <stop offset="100%" stopColor="#0d6efd" />
                    </linearGradient>
                </defs>
                <circle
                    className="timer-circle-background"
                    cx="60"
                    cy="60"
                    r={radius}
                />
                <circle
                    className={`timer-circle-progress ${timeState}`}
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                />
            </svg>
            <div className="timer-text">{timeLeft}s</div>
        </div>
    );
}

function ProgressBar({ results }) {
    return (
        <div className="custom-progress mt-3">
            {results.map((result, index) => (
                <div
                    key={index}
                    className={`progress-segment ${result === null ? 'unanswered' : result ? 'correct' : 'wrong'}`}
                ></div>
            ))}
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; 2024 Lisanegebriel Abay Kebedew. All Rights Reserved.</p>
        </footer>
    );
}

function DifficultyChooser({ onSelectDifficulty }) {
    const [timeLeft, setTimeLeft] = useState(0);

    return (
        <div className="auth-container mt-5">
            <div className="difficulty-chooser">
                <h2>Select Difficulty Level</h2>
                <div className="difficulty-option">
                    <button className="btn easy" onClick={() => {
                        onSelectDifficulty('easy');
                        setTimeLeft(6);
                    }}>Easy</button>
                    <span className="difficulty-time">6 sec</span>
                </div>
                <div className="difficulty-option">
                    <button className="btn medium" onClick={() => {
                        onSelectDifficulty('medium');
                        setTimeLeft(8);
                    }}>Medium</button>
                    <span className="difficulty-time">8 sec</span>
                </div>
                <div className="difficulty-option">
                    <button className="btn hard" onClick={() => {
                        onSelectDifficulty('hard');
                        setTimeLeft(10);
                    }}>Hard</button>
                    <span className="difficulty-time">10 sec</span>
                </div>
            </div>
        </div>
    );
}

function QuizApp() {
    const [quizData, setQuizData] = useState([]);
    const [username, setUsername] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showRegister, setShowRegister] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [scores, setScores] = useState(() => {
        const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
        return storedScores.map(s => ({ date: 'N/A', ...s }));
    });
    const [results, setResults] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [currentQuizData, setCurrentQuizData] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [category, setCategory] = useState('Axumite Kingdom');
    const [difficulty, setDifficulty] = useState('easy');
    const [level, setLevel] = useState(null);
    const [animationClass, setAnimationClass] = useState('');
    const [showCommunity, setShowCommunity] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        fetch('quizData.json')
            .then(response => response.json())
            .then(data => setQuizData(data))
            .catch(error => console.error('Error loading quiz data:', error));
    }, []);

    useEffect(() => {
        if (level && quizData.length > 0) {
            const filteredQuestions = quizData.filter(q => q.difficulty === level);
            const shuffled = filteredQuestions.sort(() => Math.random() - 0.5);
            const selected = shuffled.slice(0, 10);
            setSelectedQuestions(selected);
            setResults(Array(selected.length).fill(null));
            const newTotalTime = level === 'easy' ? 6 : level === 'medium' ? 8 : 10;
            setTimeLeft(newTotalTime);

            if (selected.length > 0) {
                setCurrentQuizData(selected[0]);
            } else {
                alert(`No questions available for level '${level}'.`);
                setLevel(null);
            }
        }
    }, [level, quizData]);

    useEffect(() => {
        if (selectedQuestions.length === 0) {
            return;
        }

        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleSubmit();
        }
    }, [timeLeft, selectedQuestions]);

    useEffect(() => {
        if (currentQuizData) {
            const newTotalTime = level === 'easy' ? 6 : level === 'medium' ? 8 : 10;
            setTimeLeft(newTotalTime);
        }
    }, [currentQuiz]);

    useEffect(() => {
        if (level) {
            document.body.classList.add('quiz-time');
            document.body.classList.remove('level-selection');
        } else {
            document.body.classList.remove('quiz-time');
            document.body.classList.add('level-selection');
        }
    }, [level]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === null) {
            document.body.classList.add('night-mode');
            localStorage.setItem('theme', 'night');
        }
    }, []);

    useEffect(() => {
        setAnimationClass('fade-in');
        const timer = setTimeout(() => setAnimationClass(''), 500);
        return () => clearTimeout(timer);
    }, [currentQuizData]);

    useEffect(() => {
        if (showCommunity) {
            setShowCommunity(false);
        }
    }, [showCommunity]);

    if (!username) {
        return showRegister ? (
            <Register onRegister={(username) => { 
                setUsername(username); 
                localStorage.setItem('username', username);
            }} onSwitchToLogin={() => setShowRegister(false)} />
        ) : (
            <Login onLogin={(username) => { 
                setUsername(username); 
                localStorage.setItem('username', username);
            }} onSwitchToRegister={() => setShowRegister(true)} />
        );
    }

    if (!level) {
        return (
            <div>
                <Navbar />
                <DifficultyChooser onSelectDifficulty={(level) => setLevel(level)} />
                <Footer />
            </div>
        );
    }

    if (showCommunity) {
        return null;
    }

    if (!currentQuizData) {
        return null;
    }

    const handleAnswerChange = (e) => {
        setSelectedAnswer(e.target.value);
        handleSubmit(e.target.value);
    };

    const handleSubmit = (selectedAnswer) => {
        const isCorrect = selectedAnswer === currentQuizData.correct;
        const newScore = isCorrect ? score + 1 : score;
        setScore(newScore);
        setResults(prevResults => {
            const newResults = [...prevResults];
            newResults[currentQuiz] = isCorrect;
            return newResults;
        });
        setSelectedAnswer(null);
        if (currentQuiz < selectedQuestions.length - 1) {
            setCurrentQuiz(currentQuiz + 1);
            setCurrentQuizData(selectedQuestions[currentQuiz + 1]);
        } else {
            const date = new Date().toLocaleDateString();
            const newScore = { username, score, level, date };
            const newScores = [...scores, newScore];
            localStorage.setItem('scores', JSON.stringify(newScores));
            setScores(newScores);
            setQuizFinished(true);
        }
    };

    const getCompliment = () => {
        const percentage = (score / selectedQuestions.length) * 100;
        if (percentage === 100) {
            return "Perfect Score! Well done!";
        } else if (percentage >= 80) {
            return "Great job!";
        } else if (percentage >= 50) {
            return "Good effort!";
        } else {
            return "Keep trying!";
        }
    };

    const getIncorrectQuestions = () => {
        return selectedQuestions.filter((_, index) => results[index] === false);
    };

    if (quizFinished) {
        const incorrectQuestions = getIncorrectQuestions();
        return (
            <div className="quiz-finished">
                <h2>{getCompliment()}</h2>
                <p>Your score: {score}/{selectedQuestions.length}</p>
                <p>Thank you for participating in the Axumite Kingdom Quiz.</p>
                {incorrectQuestions.length > 0 && (
                    <div className="incorrect-questions">
                        <h3>Questions you got wrong:</h3>
                        {incorrectQuestions.map((question, index) => (
                            <div key={index} className="incorrect-question">
                                <p><strong>Question:</strong> {question.question}</p>
                                <p><strong>Correct Answer:</strong> {question[question.correct]}</p>
                            </div>
                        ))}
                    </div>
                )}
                <button onClick={() => {
                    setQuizFinished(false);
                    setLevel(null);
                }}>Restart Quiz</button>
                <Footer />
            </div>
        );
    }

    const totalTime = level === 'easy' ? 6 : level === 'medium' ? 8 : 10;

    return (
        <div className={`quiz-time ${animationClass}`}>
            <div className="quiz-container">
                <div className="quiz-card">
                    <QuizCardHeader currentQuiz={currentQuiz} totalQuiz={selectedQuestions.length} />
                    <ProgressBar results={results} />
                    <div className="quiz-card-body">
                        <Timer timeLeft={timeLeft} totalTime={totalTime} />
                        <h4 className="animated-question">{currentQuizData.question}</h4>
                        <div className="quiz-options">
                            {['a', 'b', 'c', 'd'].map((option) => (
                                <div key={option} className="form-check animated-option">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="answer"
                                        id={option}
                                        value={option}
                                        onChange={handleAnswerChange}
                                        checked={selectedAnswer === option}
                                    />
                                    <label className="form-check-label" htmlFor={option}>
                                        {currentQuizData[option]}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

ReactDOM.render(<QuizApp />, document.getElementById('root'));

function QuizCardHeader({ currentQuiz, totalQuiz }) {
    return (
        <div className="quiz-card-header">
            <h2>Axumite Kingdom Quiz</h2>
            <div className="question-number">
                {currentQuiz + 1}/{totalQuiz}
            </div>
        </div>
    );
}
