
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Languages, Receipt, ArrowLeft } from "lucide-react";
import PasswordInput from "@/components/PasswordInput";

const Login = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, accept any credentials
      if (loginId && password) {
        navigate('/');
      }
    }, 1500);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-purple-200 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-32 w-16 h-16 bg-green-200 rounded-full animate-ping"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg">
              <Receipt size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            MOIRECIPT
          </h1>
          <p className="text-gray-600 text-sm">
            {t('professional_billing_solution')}
          </p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft size={16} className="mr-1" />
                {t('back')}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center gap-2"
              >
                <Languages size={16} />
                {language === 'en' ? 'தமிழ்' : 'EN'}
              </Button>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('login_title')}
              </h2>
              <p className="text-gray-600 text-sm">
                {t('enter_credentials_to_continue')}
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Login ID/Email Field */}
              <div className="space-y-2">
                <Label htmlFor="loginId" className="text-sm font-medium text-gray-700">
                  {t('login_id_email')}
                </Label>
                <Input
                  id="loginId"
                  type="text"
                  placeholder={t('enter_login_id_email')}
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  {t('password')}
                </Label>
                <PasswordInput
                  id="password"
                  placeholder={t('enter_password')}
                  value={password}
                  onChange={setPassword}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                    {t('remember_me')}
                  </Label>
                </div>
                
                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-blue-600 hover:text-blue-700 p-0 h-auto"
                >
                  {t('forgot_password')}
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t('logging_in')}
                  </div>
                ) : (
                  t('login')
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('or')}</span>
              </div>
            </div>

            {/* Demo Login Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 text-center">
                <strong>{t('demo_mode')}:</strong> {t('enter_any_credentials')}
              </p>
            </div>

            {/* New Account Section */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                {t('dont_have_account')}
              </p>
              <Button
                variant="outline"
                className="w-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400"
              >
                {t('create_new_account')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2024 MOIRECIPT. {t('all_rights_reserved')}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
