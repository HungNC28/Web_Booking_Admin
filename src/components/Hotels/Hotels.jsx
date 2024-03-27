import "./Hotels.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/const";

export default function Hotels() {
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const dataFetch = async () => {
        const data = await (await fetch(`${BASE_URL}/admin/hotels`)).json();

        if (data) {
            setHotels(data);
        }
    };
    useEffect(() => {
        dataFetch();
    }, []);
    const columns = [
        { field: "id", headerName: "ID", width: 300 },
        {
            field: "name",
            headerName: "Name",
            width: 300,
        },
        {
            field: "type",
            headerName: "Type",
            width: 150,
        },
        {
            field: "title",
            headerName: "Title",
            width: 300,
        },
        {
            field: "city",
            headerName: "City",
            width: 150,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (e) => {
                const deleteHandle = () => {
                    fetch(`${BASE_URL}/admin/hotels/delete/${e.row.id}`, {
                        method: "delete",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => {
                            if (response.status === 200) {
                                if (
                                    window.confirm(
                                        "Bạn có chắc muốn xóa không?"
                                    )
                                ) {
                                    alert("Delete thành thông!");
                                    dataFetch();
                                }
                            } else if (response.status === 400) {
                                alert("Hotel tồn tại trong Transactions!");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                };
                const editHandle = () => {
                    navigate(`/admin/hotels/edit/${e.row.id}`);
                };
                return (
                    <div>
                        <button className="deleteBtn" onClick={deleteHandle}>
                            Delete
                        </button>
                        <button className="editBtn" onClick={editHandle}>
                            Edit
                        </button>
                    </div>
                );
            },
        },
    ];

    const rows = hotels.map((h) => {
        return {
            id: h._id,
            name: h.name,
            type: h.type,
            title: h.title,
            city: h.city,
            action: "Delete",
        };
    });

    return (
        <div className="containerLatest">
            <div className="top-title">
                <h1>Hotels List</h1>
                <Link to="/admin/hotels/create">Add New</Link>
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
