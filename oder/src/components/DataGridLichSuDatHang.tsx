
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'hinhAnh',
    headerName: 'Hình ảnh',
    width: 100,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <img
        src={params.value}
        alt="Hình món"
        style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
      />
    ),
  },
  {
    field: 'tenMon',
    headerName: 'Tên món',
    width: 180,
    editable: false,
  },
  {
    field: 'soLuong',
    headerName: 'Số lượng',
    type: 'number',
    width: 120,
    editable: false,
  },
  {
    field: 'ngayXuat',
    headerName: 'Ngày giờ xuất',
    width: 200,
    editable: false,
    // valueFormatter: ({ value }) => {
    //     console.log('Giá trị ngayXuat:', value);
    //     if (!value) return '';
    //     try {
    //     const date = new Date(value);
    //     return isNaN(date.getTime())
    //         ? 'Không hợp lệ'
    //         : date.toLocaleString('vi-VN', { hour12: false });
    //     } catch (error) {
    //     return 'Lỗi ngày giờ';
    //     }
    // },
  },
  {
    field: 'giaTien',
    headerName: 'Giá tiền (VNĐ)',
    type: 'number',
    width: 160,
    editable: false,
  },
];

const rows = [
  {
    id: 1,
    tenMon: 'Phở Bò nướng lá lốt',
    soLuong: 2,
    ngayXuat: '2025-05-21T10:30:00',
    giaTien: 150000,
    hinhAnh: "https://fujifoods.vn/wp-content/uploads/2021/05/bo-nuong-la-lot-1-1.jpg",
  },
  {
    id: 2,
    tenMon: 'Gà nướng mật ong',
    soLuong: 1,
    ngayXuat: '2025-05-21T11:00:00',
    giaTien: 200000,
    hinhAnh: "https://i-giadinh.vnecdn.net/2022/11/24/Thanh-pham-1-1-7983-1669287068.jpg",
  },
  {
    id: 3,
    tenMon: 'Cá hồi nướng sốt Teriyaki',
    soLuong: 3,
    ngayXuat: '2025-05-21T12:15:00',
    giaTien: 250000,
    hinhAnh: "https://haisan.vivusea.com/upload/images/article//ca-hoi-sot-teriyaki.jpg",
  },
  {
    id: 4,
    tenMon: 'Sườn nướng BBQ',
    soLuong: 1,
    ngayXuat: '2025-05-21T13:45:00',
    giaTien: 180000,
    hinhAnh: "https://static-images.vnncdn.net/files/publish/2022/11/16/thum-mon-ngon-1-300.png?width=0&s=b8LgacChl4E8yxdIBM7mWg",
  },
  {
    id: 5,
    tenMon: 'Salad trộn dầu giấm',
    soLuong: 2,
    ngayXuat: '2025-05-21T14:30:00',
    giaTien: 120000,
    hinhAnh: "https://i-giadinh.vnecdn.net/2021/10/13/saladtron-1634096027-8296-1634096305.jpg",
  },
  {
    id: 6,
    tenMon: 'Cơm chiên dương châu',
    soLuong: 2,
    ngayXuat: '2025-05-22T15:30:00',
    giaTien: 100000,
    hinhAnh: "https://daotaobeptruong.vn/wp-content/uploads/2021/02/nguoc-goc.jpg",
  },
  {
    id: 7,
    tenMon: 'Phở bò tái',
    soLuong: 2,
    ngayXuat: '2025-05-22T16:10:00',
    giaTien: 90000,
    hinhAnh: "https://adamquy.com/wp-content/uploads/2023/07/to-pho-bo-tai.jpg",
  },
  {
    id: 8,
    tenMon: 'Bún chả Hà Nội',
    soLuong: 2,
    ngayXuat: '2025-05-22T19:35:00',
    giaTien: 110000,
    hinhAnh: "https://cdn.buffetposeidon.com/app/media/uploaded-files/090724-bun-cha-ha-noi-buffet-poseidon-1.jpeg",
  },
  {
    id: 9,
    tenMon: 'Chả giò chiên giòn',
    soLuong: 2,
    ngayXuat: '2025-05-23T14:30:00',
    giaTien: 120000,
    hinhAnh: "https://cdn-bafil.nitrocdn.com/brIjHWLgwndqujcHHxaCshZRYHXCVPHO/assets/images/optimized/rev-633ecd2/doiduavang.vn/wp-content/uploads/2024/01/nem-ran-1-1516-phunutoday.jpg",
  },
];

export default function DataGridLichSuDatHang() {
  const handleExportExcel = () => {
    const worksheetData = rows.map(({ id, tenMon, soLuong, ngayXuat, giaTien }) => ({
      ID: id,
      'Tên món': tenMon,
      'Số lượng': soLuong,
      'Ngày giờ xuất': new Date(ngayXuat).toLocaleString('vi-VN', { hour12: false }),
      'Giá tiền (VNĐ)': giaTien,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lịch sử đặt hàng');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'LichSuDatHang.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Stack direction="row" spacing={2} mb={2}>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          In bảng
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportExcel}
        >
          Xuất Excel
        </Button>
      </Stack>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 7 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
