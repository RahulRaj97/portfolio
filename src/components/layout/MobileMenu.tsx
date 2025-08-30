import { useState } from 'react';
import { IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavigationItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  items: readonly NavigationItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <IconButton
        color="inherit"
        onClick={toggleMenu}
        sx={{ display: { md: 'none' } }}
      >
        <Menu size={24} />
      </IconButton>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleMenu}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'rgba(254, 247, 240, 0.98)',
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <IconButton
            onClick={toggleMenu}
            sx={{ alignSelf: 'flex-end', mb: 2 }}
          >
            <X size={24} />
          </IconButton>

          <List>
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem
                    component="button"
                    onClick={() => handleNavClick(item.href)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      border: 'none',
                      background: 'none',
                      width: '100%',
                      textAlign: 'left',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                      },
                    }}
                  >
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: '1.1rem',
                      }}
                    />
                  </ListItem>
                </motion.div>
              ))}
            </AnimatePresence>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileMenu;
