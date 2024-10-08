import ShareIcon from '@mui/icons-material/Share';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Button } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button as BtnJoy } from '@mui/joy';

// Styled social media button
const SocialButton = ({ children, href }) => (
  <IconButton
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      backgroundColor: '#ffffff', // White background
      borderRadius: '50%',
      padding: '12px',
      margin: '10px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Added shadow
      transition: 'background-color 0.3s ease, transform 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = '#f0f0f0'; // Hover effect
      e.currentTarget.style.transform = 'scale(1.05)'; // Slightly enlarge on hover
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '#ffffff'; // Revert hover
      e.currentTarget.style.transform = 'scale(1)'; // Revert scaling
    }}
  >
    {children}
  </IconButton>
);

// Modal component
const ShareModal = ({ open, handleClose, shareLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Define the sharing URLs
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}&title=Check%20out%20this%20post`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this post: ${shareLink}`)}`;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="share-dialog-title"
      maxWidth="sm" // Adjusted maxWidth for a wider modal
      PaperProps={{
        style: {
          borderRadius: '20px',
          padding: '30px',
          maxWidth: '800px', // Set maximum width to 800px for a wider look
        },
      }}
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <DialogTitle id="share-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Share this Post
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <SocialButton href={whatsappShareUrl}>
            <WhatsAppIcon style={{ color: '#25D366', fontSize: '36px' }} />
          </SocialButton>
          <SocialButton href={facebookShareUrl}>
            <FacebookIcon style={{ color: '#3b5998', fontSize: '36px' }} />
          </SocialButton>
          <SocialButton href={linkedInShareUrl}>
            <LinkedInIcon style={{ color: '#0077B5', fontSize: '36px' }} />
          </SocialButton>
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            onClick={handleCopyLink}
            startIcon={<ContentCopyIcon />}
            style={{
              borderRadius: '25px',
              backgroundColor: '#0077ff',
              textTransform: 'none',
              fontWeight: 'bold',
              padding: '10px 20px',
              fontSize: '16px',
            }}
          >
            {copied ? 'Link Copied!' : 'Copy Link'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const ShareButton = ({postID}) => {
  const [open, setOpen] = useState(false);
  const shareLink = `${window.location.hostname}/posts/${postID}`;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <BtnJoy
        fullWidth
        onClick={handleOpen}
        variant='outlined'
        startDecorator={<ShareIcon />}  
      >
        Share
      </BtnJoy>

      <ShareModal open={open} handleClose={handleClose} shareLink={shareLink} />
    </>
  );
};

export default ShareButton;
