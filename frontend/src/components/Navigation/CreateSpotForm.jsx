

import { useEffect, useState } from "react";
import './CreateSpotForm.css';
import { useDispatch } from 'react-redux';
import { createSpot, updateUserSpot, fetchUserSpots } from '../../store/allSpots';
import { useParams, useNavigate } from "react-router-dom";

export default function SpotForm({ mode }) {
    const { spotId } = useParams();

    const isUpdateMode = mode === 'update';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: '',
        name: '',
        description: '',
        price: '',
        previewImage: '',
        url: ''
    });
    const [errors, setErrors] = useState({});
    const [imageErrors, setImageErrors] = useState({
        previewImage: '',
        url: ''
    });
    useEffect(() => {
        if (isUpdateMode && spotId) {
            (async () => {
                const response = await dispatch(fetchUserSpots());

                const spotToUpdate = response.find(spot => spot.id === parseInt(spotId, 10));

                if (spotToUpdate) {

                    setFormData({
                        address: spotToUpdate.address || '',
                        city: spotToUpdate.city || '',
                        state: spotToUpdate.state || '',
                        country: spotToUpdate.country || '',
                        lat: spotToUpdate.lat || '',
                        lng: spotToUpdate.lng || '',
                        name: spotToUpdate.name || '',
                        description: spotToUpdate.description || '',
                        price: spotToUpdate.price || '',
                        previewImage: spotToUpdate.previewImage || '',
                        url: spotToUpdate.url || ''
                    });
                }
            })();
        }
    }, [dispatch, isUpdateMode, spotId]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'previewImage' || name === 'url') {
            const allowedFileTypes = ['png', 'jpg', 'jpeg'];
            const fileExtension = value.split('.').pop().toLowerCase();
            if (!allowedFileTypes.includes(fileExtension)) {
                setImageErrors({
                    ...imageErrors,
                    [name]: 'Image URL needs to end in png or jpg (or jpeg)',
                });
            } else {
                setImageErrors({
                    ...imageErrors,
                    [name]: '',
                });
            }
        }

        if (name === 'lat' || name === 'lng') {
            value = parseFloat(value);
            if (isNaN(value)) {
                value = ''
            }
        }
        setFormData({ ...formData, [name]: value });

        setErrors({ ...errors, [name]: '' })
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (formData.description.length < 30) newErrors.description = 'Description needs a minimum of 30 characters';
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.previewImage) newErrors.previewImage = 'Preview image is required';


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            let result;
            if (mode === 'create') {
                result = await dispatch(createSpot(formData));

            } else if (mode === 'update') {
                result = await dispatch(updateUserSpot(spotId, formData));

            }
            // console.log("Result from dispatch:", result);
            if (result && result.id) {

                navigate(`/spots/${result.id}`);
            }else {
                setErrors({ form: 'An error occurred. Please try again.' });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrors({ form: 'An unexpected error occurred. Please try again.' });
        }
    };

    const ErrorMsg = ({ field }) => (
        <div className="error-message">{errors[field]}</div>
    );
    return (
        <form onSubmit={handleSubmit} className={isUpdateMode ? "update-spot-form" : "newspot"}>
            <h1>{mode === "create" ? "Create a New Spot" : "Update Your Spot"}</h1>
            <section className="part">
                <h2>Where&apos;s your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <div className="error-show">
                    <div className="title">Country</div>
                    <div className="error"><ErrorMsg field="country" /></div>
                </div>
                <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />

                <div className="error-show">
                    <div className="title">Street Address</div>
                    <div className="error"><ErrorMsg field="address" /></div>
                </div>
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

                <div className="two-item">
                    <div>
                        <div className="error-show">
                            <div className="title">City</div>
                            <div className="error"><ErrorMsg field="city" /></div>
                        </div>
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                    </div>
                    <div>
                        <div className="error-show">
                            <div className="title">State</div>
                            <div className="error"><ErrorMsg field="state" /></div>
                        </div>
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
                    </div>
                </div>

                <div className="two-item">
                    <div>
                        <div className="error-show">
                            <div className="title">Latitude</div>

                        </div>
                        <input type="text" name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} />
                    </div>
                    <div>
                        <div className="error-show">
                            <div className="title">Longtitude</div>

                        </div>
                        <input type="text" name="lng" placeholder="Longitude" value={formData.lng} onChange={handleChange} />
                    </div>
                </div>
            </section>
            <section className="part">
                <h2>Describe your place to guests</h2>
                <p>Mention the best features of your space, any special amentities like fast wiif or parking, and what you love about the neighborhood.</p>

                <textarea name="description" placeholder="Please write at least 30 characters" value={formData.description} onChange={handleChange}></textarea>
                <div className="error"><ErrorMsg field="description" /></div>
            </section>
            <section className="part">
                <h2>Create a title for your spot</h2>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <input type="text" name="name" placeholder="Name of your spot" value={formData.name} onChange={handleChange} />
                <div className="error"><ErrorMsg field="name" /></div>
            </section>
            <section className="part">
                <h2>Set a base price for your spot</h2>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div className="flex">
                    <p>$</p>
                    <input type="text" name="price" placeholder="Price per night(USD)" value={formData.price} onChange={handleChange} />
                </div>
                <div className="error"><ErrorMsg field="price" /></div>
            </section>
            <section className="part">
                <h2>Liven up your spot with photos</h2>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <div className="url">
                    <input type="text" name="previewImage" placeholder="Preview Image URL" value={formData.previewImage} onChange={handleChange} />
                    <div className="error"><ErrorMsg field="previewImage" /></div>
                    <input type="text" name="url" placeholder="Image URL" value={formData.url} onChange={handleChange} />

                    <input type="text" name="url" placeholder="Image URL" value={formData.url} onChange={handleChange} />

                    <input type="text" name="url" placeholder="Image URL" value={formData.url} onChange={handleChange} />

                    <input type="text" name="url" placeholder="Image URL" value={formData.url} onChange={handleChange} />

                </div>
            </section>

            <section className="part">
                <button type="submit">{isUpdateMode ? "Update Your Spot" : "Create Spot"}</button>
            </section>
        </form>
    );
}



