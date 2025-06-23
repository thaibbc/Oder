import { Link} from 'react-router-dom';
import  { useEffect } from 'react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search'
import { ThemeSwitcher } from '@toolpad/core/DashboardLayout'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import { useState } from 'react';
import  TickPlacementBars  from '../components/TickPlacementBars';
import PieArcLabel from '../components/PieArcLabel';
import DataGridLichSuDatHang from '../components/DataGridLichSuDatHang';



// const location = useLocation();



const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'Productmanagement',
    title: 'Product management',
    icon: <RamenDiningIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        text: {
          primary: '#000000',
          secondary: '#555555',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        text: {
          primary: '#ffffff',
          secondary: '#aaaaaa',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    allVariants: {
      color: '#000', // ✅ Áp dụng cho toàn bộ chữ
    },
  },
});






function DemoPageContent({ pathname }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const [products, setProducts] = useState([]); 

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState<File | null>(null);


  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState(null);


  useEffect(() => {
    // Lấy danh sách sản phẩm từ API khi component mount
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Lỗi lấy sản phẩm:', err));
  }, []);

 const handleAddProduct = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!productName || !productPrice || !productDescription) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  const formData = new FormData();
  formData.append("name", productName);
  formData.append("price", productPrice);
  formData.append("description", productDescription);
  if (productImage) {
    formData.append("image", productImage); // tên "image" trùng với `upload.single('image')` bên backend
  }

  try {
    const response = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const newProduct = await response.json();
      console.log("Đã thêm sản phẩm:", newProduct);

      // Xoá form
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductImage(null);
      alert("Thêm món ăn thành công!");
    } else {
      const errorData = await response.json();
      console.error("Lỗi khi thêm món ăn:", errorData);
      alert("Thêm món ăn thất bại!");
    }
  } catch (error) {
    console.error("Lỗi kết nối API:", error);
    alert("Có lỗi khi kết nối đến máy chủ.");
  }
};



const handleEdit = (product) => {
  setEditProduct(product);
  setEditName(product.name);
  setEditPrice(product.price);
  setEditDescription(product.description);
  setEditImage(null); // chưa thay ảnh mới
  setOpenEditDialog(true);
};

const handleDelete = async (product) => {
  const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa món "${product.name}"?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`http://localhost:5000/api/products/${product._id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const err = await response.json();
      alert(err?.error || 'Xóa không thành công');
      return;
    }

    // Cập nhật lại danh sách sản phẩm sau khi xóa
    setProducts((prev) => prev.filter((p) => p._id !== product._id));
    alert('Xóa món thành công!');
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    alert('Lỗi kết nối tới server');
  }
};

const handleUpdateProduct = async () => {
  const formData = new FormData();
  formData.append('name', editName);
  formData.append('price', editPrice);
  formData.append('description', editDescription);
  if (editImage) {
    formData.append('image', editImage);
  } else {
    formData.append('imageUrl', editProduct.imageUrl); // giữ nguyên ảnh cũ nếu không đổi
  }

  try {
    const res = await fetch(`http://localhost:5000/api/products/${editProduct._id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!res.ok) {
      alert('Cập nhật thất bại');
      return;
    }

    const updated = await res.json();

    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );

    setOpenEditDialog(false);
  } catch (err) {
    console.error(err);
    alert('Lỗi khi cập nhật');
  }
};



//   const products = [
//   {
//     id: 1,
//     name: "Bò nướng lá lốt",
//     price: "150,000đ",
//     imageUrl: "https://fujifoods.vn/wp-content/uploads/2021/05/bo-nuong-la-lot-1-1.jpg",
//     description: "Thịt bò ướp gia vị, cuốn lá lốt nướng thơm ngon đậm đà.",
//   },
//   {
//     id: 2,
//     name: "Gà nướng mật ong",
//     price: "200,000đ",
//     imageUrl: "https://i-giadinh.vnecdn.net/2022/11/24/Thanh-pham-1-1-7983-1669287068.jpg",
//     description: "Gà nướng mềm thơm với mật ong tự nhiên ngọt dịu.",
//   },
//   {
//     id: 3,
//     name: "Cá hồi nướng sốt Teriyaki",
//     price: "250,000đ",
//     imageUrl: "https://haisan.vivusea.com/upload/images/article//ca-hoi-sot-teriyaki.jpg",
//     description: "Cá hồi tươi nướng cùng sốt Teriyaki đậm đà hương vị Nhật.",
//   },
//   {
//     id: 4,
//     name: "Sườn nướng BBQ",
//     price: "180,000đ",
//     imageUrl: "https://static-images.vnncdn.net/files/publish/2022/11/16/thum-mon-ngon-1-300.png?width=0&s=b8LgacChl4E8yxdIBM7mWg",
//     description: "Sườn heo nướng BBQ cay ngọt, giòn rụm và thơm lừng.",
//   },
//   {
//     id: 5,
//     name: "Salad trộn dầu giấm",
//     price: "120,000đ",
//     imageUrl: "https://i-giadinh.vnecdn.net/2021/10/13/saladtron-1634096027-8296-1634096305.jpg",
//     description: "Salad tươi mát với sốt dầu giấm thanh nhẹ, tốt cho sức khỏe.",
//   },
//   {
//     id: 6,
//     name: "Cơm chiên dương châu",
//     price: "100,000đ",
//     imageUrl: "https://daotaobeptruong.vn/wp-content/uploads/2021/02/nguoc-goc.jpg",
//     description: "Cơm chiên vàng ươm với nhiều loại rau củ và thịt thập cẩm.",
//   },
//   {
//     id: 7,
//     name: "Phở bò tái",
//     price: "90,000đ",
//     imageUrl: "https://adamquy.com/wp-content/uploads/2023/07/to-pho-bo-tai.jpg",
//     description: "Phở truyền thống với nước dùng đậm đà và bò tái mềm.",
//   },
//   {
//     id: 8,
//     name: "Bún chả Hà Nội",
//     price: "110,000đ",
//     imageUrl: "https://cdn.buffetposeidon.com/app/media/uploaded-files/090724-bun-cha-ha-noi-buffet-poseidon-1.jpeg",
//     description: "Bún chả đặc trưng Hà Nội với chả nướng thơm ngon, nước chấm chua ngọt.",
//   },
//   {
//     id: 9,
//     name: "Chả giò chiên giòn",
//     price: "80,000đ",
//     imageUrl: "https://cdn-bafil.nitrocdn.com/brIjHWLgwndqujcHHxaCshZRYHXCVPHO/assets/images/optimized/rev-633ecd2/doiduavang.vn/wp-content/uploads/2024/01/nem-ran-1-1516-phunutoday.jpg",
//     description: "Chả giò giòn tan, nhân đầy đủ với thịt và rau củ tươi ngon.",
//   },
// ];
  return (
    <Box
      sx={{
        py: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
       {pathname === '/Productmanagement' ? (
          <Box width="100%" maxWidth="600px">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Thêm món ăn
            </Typography>
            <form onSubmit={handleAddProduct} style={{zIndex: 1300, background:'white'}}>
              <TextField fullWidth label="Tên món" value={productName} onChange={(e) => setProductName(e.target.value)}  sx={{margin:'5px 0'}}/>
              <TextField fullWidth label="Giá món" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} sx={{margin:'5px 0'}}/>
              <TextField fullWidth label="Mô tả món" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} multiline rows={3} sx={{margin:'5px 0'}}/>
              <Button variant="contained" component="label" sx={{ mt: 2 }}>
                Tải ảnh món ăn
                <input type="file" hidden onChange={(e) => setProductImage(e.target.files?.[0])} />
              </Button>
              {productImage && <Typography mt={1} variant="body2">Đã chọn: {productImage.name}</Typography>}
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
                Thêm món ăn
              </Button>
            </form>
          </Box>
        ) :  pathname === '/reports' ? (
          <Box p={3} sx={{width:'100%'}}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Báo Cáo Doanh Thu
            </Typography>
            <Box sx={{ width:'100%', display:'flex'}}>
              <TickPlacementBars/>
              <PieArcLabel/>
            </Box>
            <Box mt={4}>
              <DataGridLichSuDatHang/>
            </Box>
          </Box>
         ) : (
          <Box mt={4} pb={4} ml={8.5}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ paddingBottom: '10px', marginBottom: '50px', marginLeft: '-15%' }}>
              Danh Sách Món Ăn
            </Typography>
            <Grid container spacing={8}>
              {products.map((prod) => (
                <Grid item xs={12} sm={6} md={4} key={prod.id}>
                  <Card sx={{borderRadius:'5px', border:'2px solid'}}>
                    <CardMedia component="img" height="180" image={prod.imageUrl} alt={prod.name} />
                    <CardContent>
                      <Typography variant="h6">{prod.name}</Typography>
                      <Typography color="primary" fontWeight="bold">{prod.price}</Typography>
                      <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="outlined" color="primary" startIcon={<EditIcon sx={{color:'black'}} />} onClick={() => handleEdit(prod)}>Sửa</Button>
                        <Button variant="outlined" color="error" startIcon={<DeleteIcon sx={{color:'black'}} />} onClick={() => handleDelete(prod)}>Xóa</Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
    <DialogTitle>Chỉnh sửa món ăn</DialogTitle>
    <DialogContent>
      <TextField
        fullWidth
        label="Tên món"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
        sx={{ my: 1 }}
      />
      <TextField
        fullWidth
        label="Giá món"
        value={editPrice}
        onChange={(e) => setEditPrice(e.target.value)}
        sx={{ my: 1 }}
      />
      <TextField
        fullWidth
        label="Mô tả"
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        multiline
        rows={3}
        sx={{ my: 1 }}
      />
      <Button variant="contained" component="label" sx={{ my: 2 }}>
        Thay ảnh món ăn
        <input type="file" hidden onChange={(e) => setEditImage(e.target.files?.[0])} />
      </Button>
      {editImage ? (
        <Typography variant="body2">Đã chọn: {editImage.name}</Typography>
      ) : (
        <img src={editProduct?.imageUrl} alt="Món ăn hiện tại" width="100%" style={{ marginTop: 10 }} />
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenEditDialog(false)}>Hủy</Button>
      <Button onClick={handleUpdateProduct} variant="contained" color="primary">Lưu thay đổi</Button>
    </DialogActions>
  </Dialog>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function ToolbarActionsSearch() {
  return (
    <Stack direction="row">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: 'inline', md: 'none' },
            }}
          >
            <SearchIcon/>
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
      <ThemeSwitcher />
    </Stack>
  );
}

const providers = [{ id: 'credentials', name: 'Email and Password' }];
// preview-end

const signIn = async (provider, formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = formData.get('email');
      const name = email.split('@')[0];
      const image = 'https://i.pravatar.cc/300';
      setSession({ user: { name, email, image } });
      localStorage.setItem('email', email); // ✅ Lưu email
      resolve();
    }, 300);
  });
};




function App(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');
  const navigate = useNavigate();

  const [session, setSession] = React.useState(null);
  React.useEffect(() => {
  const storedEmail = localStorage.getItem('email');
  if (storedEmail) {
    setSession({
      user: {
        name: storedEmail.split('@')[0],
        email: storedEmail,
        image: 'https://i.pravatar.cc/300',
      },
    });
  }
}, []);
  const [signOutDialogOpen, setSignOutDialogOpen] = React.useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = React.useState(false);

  const handleSignInOpen = () => {
    setSignInDialogOpen(true);
  };

  const handleSignOutOpen = () => {
    setSignOutDialogOpen(true);
  };

  const handleSignOutClose = () => {
    setSignOutDialogOpen(false);
  };

  const handleSignOutConfirm = () => {
    setSignOutDialogOpen(false);
    localStorage.removeItem('email'); // ✅ Xóa email
    setSession(null);
    navigate('/');
  };

  

  const authentication = React.useMemo(() => {
  return {
    signIn: signIn,
    signOut: handleSignOutOpen,
  };
}, []);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;


  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{
        logo: (
          <Link to="/" style={{ textDecoration: 'none' }}>
            <i className="fa-solid fa-bowl-food" style={{ fontSize: 32, color: 'black' }}></i>
          </Link>
        ),
        title: (
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h6" sx={{ color: 'primary.black', fontWeight: 'bold' }}>
              Oder Food
            </Typography>
          </Link>
        ),
        homeUrl: '/',
      }}

      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout 
      slots={{
        toolbarActions: ToolbarActionsSearch
      }}
      >
        <Dialog
          open={signOutDialogOpen}
          onClose={handleSignOutClose}
          aria-labelledby="sign-out-dialog-title"
        >
          <DialogTitle id="sign-out-dialog-title">Sign Out</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to sign out?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSignOutClose} color="primary" sx={{":hover": {color: 'red'}}}>
              Cancel
            </Button>
            <Button onClick={handleSignOutConfirm} color="primary" autoFocus>
              Sign Out
            </Button>
          </DialogActions>
        </Dialog>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  )
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default App
