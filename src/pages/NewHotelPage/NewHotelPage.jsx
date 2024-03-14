import { Form, useNavigate } from "react-router-dom";
import "./NewHotelPage.css";
import { useState } from "react";

export default function NewHotelPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [distance, setDistance] = useState(0);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [imgUrl, setImgUrl] = useState([]);
    const [featured, setFeatured] = useState(false);
    const [rooms, setRooms] = useState([]);

    const submitHandle = (e) => {
        e.preventDefault();

        // Validate thông tin
        if (name === "") {
            alert("Tên khách sạn không được bỏ trống!");
        } else if (type === "") {
            alert("Loại khách sạn không được bỏ trống!");
        } else if (city === "") {
            alert("Thành phố không được bỏ trống!");
        } else if (address === "") {
            alert("Địa chỉ khách sạn không được bỏ trống!");
        } else if (distance === "") {
            alert("Khoảng cách không được bỏ trống!");
        } else if (title === "") {
            alert("Tiêu đề không được bỏ trống!");
        } else if (description === "") {
            alert("Miêu tả khách sạn không được bỏ trống!");
        } else if (imgUrl.length === 0) {
            alert("Link ảnh không được bỏ trống!");
        } else if (rooms.length === 0) {
            alert("Phòng không được bỏ trống!");
        } else {
            const formData = {
                name,
                type,
                city,
                address,
                distance,
                title,
                desc: description,
                cheapestPrice: Number(price),
                photos: imgUrl.split(","),
                featured,
                rooms: rooms.split(","),
            };
            fetch("http://localhost:5000/api/admin/hotels/add", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((res) => {
                    if (res.status === 201) {
                        navigate("/admin/hotels");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div>
            <div className="title">
                <h1>Add New Product</h1>
            </div>
            <Form onSubmit={submitHandle}>
                {/*  */}
                <div className="form">
                    <div>
                        <div className="form_info">
                            <div className="form_controller">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    onChange={(e) => {
                                        setType(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                    }}
                                />
                            </div>{" "}
                            <div className="form_controller">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    onChange={(e) => {
                                        setAddress(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Distance from City Center</label>
                                <input
                                    type="number"
                                    name="distance"
                                    onChange={(e) => {
                                        setDistance(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Description</label>
                                <input
                                    type="text"
                                    name="desc"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="tag"
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Images</label>
                                <textarea
                                    name="photos"
                                    onChange={(e) => {
                                        setImgUrl(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="form_controller">
                                <label>Featured</label>
                                <select
                                    name="featured"
                                    onChange={(e) => {
                                        if (e.target.value === "Yes") {
                                            setFeatured(true);
                                        } else if (e.target.value === "No") {
                                            setFeatured(false);
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
                                type="text"
                                name="rooms"
                                onChange={(e) => {
                                    setRooms(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit">Send</button>
            </Form>
        </div>
    );
}
