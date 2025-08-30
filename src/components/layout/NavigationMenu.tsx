
import { Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface NavigationItem {
  label: string;
  href: string;
}

interface NavigationMenuProps {
  items: readonly NavigationItem[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ items }) => {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box component="nav" sx={{ display: 'flex', gap: 2 }}>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            color="inherit"
            onClick={() => handleNavClick(item.href)}
            sx={{
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                width: 0,
                height: 2,
                backgroundColor: 'primary.main',
                transition: 'all 0.3s ease',
                transform: 'translateX(-50%)',
              },
              '&:hover::after': {
                width: '100%',
              },
            }}
          >
            {item.label}
          </Button>
        </motion.div>
      ))}
    </Box>
  );
};

export default NavigationMenu;
