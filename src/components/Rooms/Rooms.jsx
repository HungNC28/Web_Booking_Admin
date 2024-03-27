import "./Rooms.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/const";

export default function Rooms() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const dataFetch = async () => {
        const data = await (await fetch(`${BASE_URL}/admin/rooms`)).json();

        if (data) {
            setRooms(data);
        }
    };
    useEffect(() => {
        dataFetch();
    }, []);

    const columns = [
        { field: "id", headerName: "ID", width: 300 },
        {
            field: "title",
            headerName: "Title",
            width: 300,
        },
        {
            field: "description",
            headerName: "Description",
            width: 400,
        },
        {
            field: "price",
            headerName: "Price",
            width: 110,
        },
        {
            field: "maxPeople",
            headerName: "Max people",
            width: 150,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (e) => {
                const deleteHandle = () => {
                    fetch(`${BASE_URL}/admin/rooms/delete/${e.row.id}`, {
                        method: "delete",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => {
                            if (response.status === 200) {
                                if (
                                    window.confirm(
                                        "Bạn có chắc chắn muốn xóa không?"
                                    )
                                ) {
                                    alert("Delete thành thông!");
                                    dataFetch();
                                }
                            } else if (response.status === 400) {
                                alert("Rooom tồn tại trong Transactions!");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };
                const EditHandle = () => {
                    navigate(`/admin/rooms/edit/${e.row.id}`);
                };
                return (
                    <div>
                        <button className="deleteBtn" onClick={deleteHandle}>
                            Delete
                        </button>
                        <button className="editBtn" onClick={EditHandle}>
                            Edit
                        </button>
                    </div>
                );
            },
        },
    ];

    const rows = rooms.map((r) => {
        return {
            id: r._id,
            title: r.title,
            description: r.desc,
            price: r.price,
            maxPeople: r.maxPeople,
            action: "Delete",
        };
    });

    return (
        <div className="containerLatest">
            <div className="top-title">
                <h1>Rooms List</h1>
                <Link to="/admin/rooms/create">Add New</Link>
            </div>
            <Box sx={{ height: "fit-content", width: "100%" }}>
                <DataGrid
                    getRowId={(row) => row.id}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
                            },
                        },
                    }}
                    pageSizeOptions={[8]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
}
