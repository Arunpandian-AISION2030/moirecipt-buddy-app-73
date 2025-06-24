
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface MobileCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  onClick: () => void;
  gradient: string;
  children?: ReactNode;
}

const MobileCard = ({ title, icon, description, onClick, gradient, children }: MobileCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className={`${gradient} text-white border-0 shadow-lg cursor-pointer active:scale-95 transition-all duration-200 touch-manipulation`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <span className="truncate">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm opacity-90 leading-relaxed">{description}</p>
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileCard;
