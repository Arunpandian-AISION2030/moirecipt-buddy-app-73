
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Camera, Shield, TrendingUp } from "lucide-react";

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const OnboardingCarousel = ({ onComplete }: OnboardingCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  const slides = [
    {
      icon: Camera,
      title: t('onboarding_slide1_title'),
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Shield,
      title: t('onboarding_slide2_title'),
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: TrendingUp,
      title: t('onboarding_slide3_title'),
      gradient: "from-green-500 to-blue-600"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${currentSlideData.gradient} text-white transition-all duration-500`}>
      {/* Skip button */}
      <button 
        onClick={skipOnboarding}
        className="absolute top-8 right-8 text-white/80 hover:text-white transition-colors"
      >
        {t('skip')}
      </button>

      {/* Main content */}
      <div className="text-center px-8 max-w-md">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <IconComponent size={48} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed animate-fade-in">
          {currentSlideData.title}
        </h2>

        {/* Slide indicators */}
        <div className="flex justify-center space-x-3 mb-12">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Navigation button */}
        <Button
          onClick={nextSlide}
          size="lg"
          className="bg-white text-gray-800 hover:bg-gray-100 font-semibold px-12 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          {currentSlide === slides.length - 1 ? t('get_started') : t('next')}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
