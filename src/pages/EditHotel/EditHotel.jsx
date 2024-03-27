import "./EditHotel.css";
import { useParams, Form, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/const";

export default function EditHotel() {
    const navigate = useNavigate();
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState({});

    const url = `${BASE_URL}/hotels/${hotelId}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url); // Thay đổi URL thành URL thực tế của API
                const jsonData = await response.json();
                if (jsonData) {
                    setHotel({ ...jsonData });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // const data = useFetch(url);

    const submitHandle = (e) => {
        e.preventDefault();

        fetch(`${BASE_URL}/admin/hotels/update/${hotelId}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(hotel),
        })
            .then((res) => {
                if (res.status === 201) {
                    navigate("/admin/hotels");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <div className="title">
                <h1>Update Product</h1>
            </div>
            {hotel && (
                <Form onSubmit={submitHandle}>
                    {/*  */}
                    <div className="form">
                        <div>
                            <div className="form_info">
                                <div className="form_controller">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        value={hotel.name}
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                name: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form_controller">
                                    <label>Type</label>
                                    <input
                                        value={hotel.type}
                                        type="text"
                                        name="type"
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                type: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form_controller">
                                    <label>City</label>
                                    <input
                                        value={hotel.city}
                                        type="text"
                                        name="city"
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                city: e.target.value,
                                            });
                                        }}
                                    />
                                </div>{" "}
                                <div className="form_controller">
                                    <label>Address</label>
                                    <input
                                        value={hotel.address}
                                        type="text"
                                        name="address"
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                address: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form_controller">
                                    <label>Distance from City Center</label>
                                    <input
                                        value={hotel.distance}
                                        type="number"
                                        name="distance"
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                distance: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form_controller">
                                    <label>Title</label>
                                    <input
                                        value={hotel.title}
                                        type="text"
                                        name="title"
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                title: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form_controller">
                                    <label>Description</label>
                                    <input
                                        value={hotel.desc}
                                        type="text"
                                        name="desc"
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                desc: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form_controller">
                                    <label>Price</label>
                                    <input
                                        value={hotel.cheapestPrice}
                                        type="number"
                                        name="tag"
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                cheapestPrice: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form_controller">
                                    <label>Images</label>
                                    <textarea
                                        value={hotel.photos}
                                        name="photos"
                                        onChange={(e) => {
                                            setHotel({
                                                ...hotel,
                                                photos: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="form_controller">
                                    <label>Featured</label>
                                    <select
                                        value={hotel.featured}
                                        name="featured"
                                        onChange={(e) => {
                                            if (e.target.value === "Yes") {
                                                setHotel({
                                                    ...hotel,
                                                    featured: true,
                                                });
                                            } else if (
                                                e.target.value === "No"
                                            ) {
                                                setHotel({
                                                    ...hotel,
                                                    featured: false,
                                                });
                                            }
                                        }}
                                    >
                                        <option>No</option>
                                        <option>Yes</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form_controller">
                                <label>Rooms</label>
                                <input
                                    value={hotel.rooms}
                                    type="text"
                                    name="rooms"
                                    onChange={(e) => {
                                        setHotel({
                                            ...hotel,
                                            rooms: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit">Update</button>
                </Form>
            )}
        </div>
    );
}
