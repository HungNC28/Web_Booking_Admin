import "./Transactions.css";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/const";

export default function Transactions() {
    const [lastest, setLastest] = useState([]);
    useEffect(() => {
        // fetch transaction data
        const dataFetch = async () => {
            const transactions = await (
                await fetch(`${BASE_URL}/admin/lastest`)
            ).json();

            if (transactions) {
                setLastest(transactions);
            }
        };
        dataFetch();
    }, []);

    const addArr = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            return [arr[0].concat(arr[i + 1])];
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 300 },
        {
            field: "user",
            headerName: "User",
            width: 200,
        },
        {
            field: "hotel",
            headerName: "Hotel",
            width: 300,
        },
        {
            field: "room",
            headerName: "Room",
            width: 200,
        },
        {
            field: "date",
            headerName: "Date",
            width: 200,
        },
        {
            field: "price",
            headerName: "Price",
            width: 100,
        },
        {
            field: "payment",
            headerName: "Payment Method",
            width: 200,
        },
        {
            field: "status",
            headerName: "Status",
            width: 100,
        },
    ];

    const rows = lastest.map((t) => {
        return {
            id: t._doc._id,
            user: t._doc.user,
            hotel: t.name,
            room: addArr(t._doc.roomArr.map((r) => r.rooms_arr)).join(", "),
            date: t.date,
            price: `$${t._doc.price}`,
            payment: t._doc.payment,
            status: t._doc.status,
        };
    });
    return (
        <div className="containerLatest">
            <div className="top-title">
                <h1>Transactions List</h1>
            </div>
            <Box sx={{ height: "fit-content", width: "100%" }}>
                <DataGrid
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
