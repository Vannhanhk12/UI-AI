import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Globe, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Định nghĩa types cho props
interface LanguageSwitcherProps {
  isAdmin?: boolean;
  variant?: 'dropdown' | 'buttons' | 'minimal';
  className?: string;
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

// Thêm type cho props và giá trị mặc định
const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  isAdmin = false, 
  variant = 'dropdown', 
  className = '' 
}) => {
  const { t, i18n } = useTranslation();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];
    
  // Hàm làm mới dữ liệu dịch (giả lập)
  const handleRefreshTranslations = async () => {
    if (isRefreshing) return;
    
    try {
      setIsRefreshing(true);
      // Giả lập gọi API làm mới dữ liệu dịch
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Gọi i18n để reload resource
      await i18n.reloadResources();
      toast.success(t('translationsRefreshed', 'Translations refreshed'));
    } catch (error) {
      console.error('Error refreshing translations:', error);
      toast.error(t('translationsRefreshError', 'Failed to refresh translations'));
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <span className="md:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center gap-2 ${i18n.language === language.code ? "bg-blue-50 text-blue-600" : ""}`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}

        {/* Thêm nút làm mới cho admin */}
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleRefreshTranslations}
              disabled={isRefreshing}
              className="flex items-center gap-2 cursor-pointer"
            >
              {isRefreshing ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{t('refreshing', 'Refreshing...')}</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>{t('refreshTranslations', 'Refresh Translations')}</span>
                </span>
              )}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;