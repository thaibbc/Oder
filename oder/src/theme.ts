import { extendTheme } from '@mui/material/styles';

const theme = extendTheme({
  palette: {
    text: {
      primary: '#000000', // Đặt màu chữ chính là đen
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#000000', // Áp dụng cho phần thân trang
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px'
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: '#000000',
        }
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000',
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.85rem',
          color: '#000000',
          '& fieldset': { borderWidth: '0.5px !important' },
          '&:hover fieldset': { borderWidth: '1px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1px !important' }
        },
      },
    },
  },
});

export default theme;
