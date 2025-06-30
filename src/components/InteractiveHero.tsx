import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Award, 
  Zap,
  Globe,
  Code,
  Database,
  Shield,
  Cloud,
  Cpu,
  Smartphone,
  Gamepad2,
  Bitcoin,
  Trophy,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
  CheckCircle,
  Sparkles,
  Rocket,
  Target,
  Star
} from 'lucide-react';

const InteractiveHero: React.FC = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, isAuthenticated, isFirebaseReady } = useAuth();
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mouse tracking for dynamic effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Redirect authenticated users to hackathons
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/hackathons');
    }
  }, [isAuthenticated, navigate]);

  const techCategories = [
    { name: 'Programming', icon: Code, color: 'from-blue-500 to-blue-600' },
    { name: 'AI & ML', icon: Cpu, color: 'from-purple-500 to-purple-600' },
    { name: 'Data Science', icon: Database, color: 'from-green-500 to-green-600' },
    { name: 'Cybersecurity', icon: Shield, color: 'from-red-500 to-red-600' },
    { name: 'Cloud Computing', icon: Cloud, color: 'from-indigo-500 to-indigo-600' },
    { name: 'Web Development', icon: Globe, color: 'from-orange-500 to-orange-600' },
    { name: 'Mobile Dev', icon: Smartphone, color: 'from-pink-500 to-pink-600' },
    { name: 'Game Dev', icon: Gamepad2, color: 'from-yellow-500 to-yellow-600' },
    { name: 'Blockchain', icon: Bitcoin, color: 'from-teal-500 to-teal-600' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleGoogleSignIn = async () => {
    if (!isFirebaseReady) {
      setError('Authentication service is not ready. Please try again.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      setSuccess('Successfully signed in with Google!');
      // Navigation will happen automatically via useEffect
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFirebaseReady) {
      setError('Authentication service is not ready. Please try again.');
      return;
    }

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (isSignUp && !formData.name) {
      setError('Please enter your name');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      if (isSignUp) {
        await signUpWithEmail(formData.email, formData.password, formData.name);
        setSuccess('Account created successfully! Redirecting to hackathons...');
      } else {
        await signInWithEmail(formData.email, formData.password);
        setSuccess('Successfully signed in! Redirecting to hackathons...');
      }
      
      // Navigation will happen automatically via useEffect
    } catch (error: any) {
      console.error('Email auth error:', error);
      setError(error.message || `Failed to ${isSignUp ? 'create account' : 'sign in'}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setSuccess('');
    setFormData({ name: '', email: '', password: '' });
  };

  // Don't render anything for authenticated users (they'll be redirected)
  if (isAuthenticated) {
    return null;
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(139, 92, 246, 0.15) 0%, 
            rgba(59, 130, 246, 0.1) 25%, 
            rgba(16, 185, 129, 0.05) 50%, 
            transparent 70%),
          linear-gradient(135deg, 
            #0f172a 0%, 
            #581c87 25%, 
            #1e1b4b 50%, 
            #0f172a 75%, 
            #164e63 100%)
        `,
        transition: 'background 0.3s ease-out'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)`
            }}
          />
        ))}

        {/* Dynamic Gradient Orbs */}
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'linear-gradient(45deg, #8b5cf6, #3b82f6)',
            left: `${mousePosition.x * 0.8}%`,
            top: `${mousePosition.y * 0.8}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.5s ease-out'
          }}
        />
        <div
          className="absolute w-64 h-64 rounded-full opacity-8 blur-2xl"
          style={{
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            left: `${100 - mousePosition.x * 0.6}%`,
            top: `${100 - mousePosition.y * 0.6}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.4s ease-out'
          }}
        />

        {/* Floating Tech Icons */}
        {techCategories.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className="absolute opacity-10 animate-float"
              style={{
                left: `${10 + (index * 10) % 80}%`,
                top: `${15 + (index * 15) % 70}%`,
                animationDelay: `${index * 0.5}s`,
                transform: `translate(${(mousePosition.x - 50) * 0.03}px, ${(mousePosition.y - 50) * 0.03}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tech.color} flex items-center justify-center`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">Join the Tech Revolution</span>
                <Rocket className="h-4 w-4 text-blue-400" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Master Every
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Technology
                </span>
                Domain
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                From programming fundamentals to cutting-edge AI, join thousands of students building their tech careers with 
                <span className="text-blue-400 font-semibold"> interactive courses</span>, 
                <span className="text-purple-400 font-semibold"> live hackathons</span>, and 
                <span className="text-cyan-400 font-semibold"> real-world projects</span>.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: BookOpen, text: '500+ Courses', color: 'text-blue-400' },
                { icon: Trophy, text: 'Global Hackathons', color: 'text-yellow-400' },
                { icon: Users, text: '50K+ Students', color: 'text-green-400' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
                    style={{
                      transform: `translateY(${Math.sin((mousePosition.x + mousePosition.y + index * 30) * 0.01) * 2}px)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                    <span className="text-white font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA for non-authenticated users */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading || !isFirebaseReady}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Rocket className="h-5 w-5" />}
                <span>Start Learning Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <Link
                to="/hackathons"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Trophy className="h-5 w-5" />
                <span>View Hackathons</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center space-x-2 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">SkillSync Academy</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {isSignUp ? 'Join thousands of tech learners' : 'Continue your learning journey'}
                  </p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-red-200 text-sm">{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-green-200 text-sm">{success}</span>
                  </div>
                )}

                {/* Google Sign In */}
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading || !isFirebaseReady}
                  className="w-full bg-white text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors mb-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  )}
                  <span>Continue with Google</span>
                </button>

                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-300">or</span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  {isSignUp && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                          required={isSignUp}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !isFirebaseReady}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Target className="h-5 w-5" />
                    )}
                    <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={toggleAuthMode}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    {isSignUp 
                      ? 'Already have an account? Sign in' 
                      : "Don't have an account? Sign up"
                    }
                  </button>
                </div>

                {!isFirebaseReady && (
                  <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-200 text-xs text-center">
                      Setting up authentication service...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Elements */}
      <div className="absolute bottom-8 left-8 hidden lg:block">
        <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white/20"></div>
            ))}
          </div>
          <div className="text-white text-sm">
            <span className="font-semibold">2,847</span> students learning now
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">4.9/5</span>
          </div>
          <p className="text-gray-300 text-xs">Average student rating</p>
        </div>
      </div>
    </section>
  );
};

export default InteractiveHero;