import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newProduct.css';
import { useAlert } from '../components/Alert/Alert';

const NewProductForm = () => {
    const apiURL = 'http://localhost:5000';
    const { showAlert, AlertComponent } = useAlert();
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        model: '',
        price: '',
        avgKmPerCharge: '',
        description: '',
        colorsAvailable: [],
        warranty: '',
        stock: '',
        images: [],
        battery: {
            type: [],
            ratingAh: [],
            lithiumRating: '',
            numberOfBatteries: {
                vrla: '',
                lithium: '',
            },
            chargerType: '',
            chargerRatingA: '',
            chargingTime: {
                vrla: '',
                lithium: '',
            },
            mileagePerFullCharge: '',
        },
        powertrain: {
            motorOutputRated: '',
            motorOutputPeak: '',
            motorType: '',
            topSpeed: '',
        },
        wheelsAndBrakes: {
            tyreSize: '',
            rimSize: '',
            rimType: '',
            turningRadius: '',
            frontBrakes: '',
            rearBrakes: '',
        },
        frameAndChassis: {
            chassisType: '',
            dimensions: {
                length: '',
                width: '',
                height: '',
            },
            groundClearance: '',
            roofMaterial: '',
            frontSuspension: '',
            rearSuspension: '',
            seatingCapacity: '',
            passengerSeat: '',
            payloadCapacityKg: '',
        },
        additionalFeatures: {
            digitalSpeedometer: false,
            reverseCamera: 'No',
            stepneeCover: false,
            bluetoothMusicSystem: false,
            ledHeadlights: false,
            ledTurnTailLights: false,
            passengerGrabHandles: false,
            passengerCurtains: false,
            fireExtinguisher: false,
            rubberFloorMats: false,
            toolKit: false,
            openingRearDoor: 'No',
            roofCarrier: false,
            cabinLight: false,
            taxiLight: 'No',
            reverseBuzzer: 'No',
        },
    });
    const [editingId, setEditingId] = useState(null);
    const [colorInput, setColorInput] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${apiURL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: type === 'checkbox' ? checked : value
                }
            }));
        } else if (name.includes('>')) {
            const [parent, child, subChild] = name.split('>');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: {
                        ...prev[parent][child],
                        [subChild]: type === 'checkbox' ? checked : value
                    }
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleArrayChange = (path, value) => {
        const pathParts = path.split('.');

        setFormData(prev => {
            const newData = { ...prev };
            let current = newData;

            // Traverse the path except the last part
            for (let i = 0; i < pathParts.length - 1; i++) {
                current = current[pathParts[i]];
            }

            // Set the final value
            const lastKey = pathParts[pathParts.length - 1];
            current[lastKey] = value.split(',').map(item => item.trim());

            return newData;
        });
    };

    const handleColorAdd = () => {
        if (colorInput && !formData.colorsAvailable.includes(colorInput)) {
            setFormData(prev => ({
                ...prev,
                colorsAvailable: [...prev.colorsAvailable, colorInput]
            }));
            setColorInput('');
        }
    };

    const handleColorRemove = (color) => {
        setFormData(prev => ({
            ...prev,
            colorsAvailable: prev.colorsAvailable.filter(c => c !== color)
        }));
    };
    const randomToken = 'Bearer faketoken1234567890'

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${apiURL}/api/products/${editingId}`, formData, {
                    headers: {
                        Authorization: randomToken
                    }
                });
            } else {
                await axios.post(`${apiURL}/api/products`, formData, {
                    headers: {
                        Authorization: randomToken
                    }
                });
            }
            resetForm();
            showAlert('Added Successfully', 'success');
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            brand: '',
            model: '',
            price: '',
            avgKmPerCharge: '',
            description: '',
            colorsAvailable: [],
            warranty: '',
            stock: '',
            images: [],
            battery: {
                type: [],
                ratingAh: [],
                lithiumRating: '',
                numberOfBatteries: {
                    vrla: '',
                    lithium: '',
                },
                chargerType: '',
                chargerRatingA: '',
                chargingTime: {
                    vrla: '',
                    lithium: '',
                },
                mileagePerFullCharge: '',
            },
            powertrain: {
                motorOutputRated: '',
                motorOutputPeak: '',
                motorType: '',
                topSpeed: '',
            },
            wheelsAndBrakes: {
                tyreSize: '',
                rimSize: '',
                rimType: '',
                turningRadius: '',
                frontBrakes: '',
                rearBrakes: '',
            },
            frameAndChassis: {
                chassisType: '',
                dimensions: {
                    length: '',
                    width: '',
                    height: '',
                },
                groundClearance: '',
                roofMaterial: '',
                frontSuspension: '',
                rearSuspension: '',
                seatingCapacity: '',
                passengerSeat: '',
                payloadCapacityKg: '',
            },
            additionalFeatures: {
                digitalSpeedometer: false,
                reverseCamera: 'No',
                stepneeCover: false,
                bluetoothMusicSystem: false,
                ledHeadlights: false,
                ledTurnTailLights: false,
                passengerGrabHandles: false,
                passengerCurtains: false,
                fireExtinguisher: false,
                rubberFloorMats: false,
                toolKit: false,
                openingRearDoor: 'No',
                roofCarrier: false,
                cabinLight: false,
                taxiLight: 'No',
                reverseBuzzer: 'No',
            },
        });
        setEditingId(null);
    };

    const handleEdit = (product) => {
        setFormData(product);
        setEditingId(product._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete the listing ?')) {
            try {
                await axios.delete(`${apiURL}/api/products/${id}`);
                showAlert('Listing Deleted', 'warning');
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="newproduct-container">
            <AlertComponent />
            <div className="newproduct-form-container">
                <h2 className="newproduct-title">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                <form onSubmit={handleSubmit} className="newproduct-form">
                    <div className="newproduct-form-section">
                        <h3 className="newproduct-section-title">Basic Information</h3>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="newproduct-input"
                                required
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="newproduct-input"
                                required
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Model</label>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                className="newproduct-input"
                                required
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="newproduct-input"
                                required
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Average KM per Charge</label>
                            <input
                                type="text"
                                name="avgKmPerCharge"
                                value={formData.avgKmPerCharge}
                                onChange={handleChange}
                                className="newproduct-input"
                                required
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="newproduct-textarea"
                                required
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Colors Available</label>
                            <div className="newproduct-color-input-container">
                                <input
                                    type="text"
                                    value={colorInput}
                                    onChange={(e) => setColorInput(e.target.value)}
                                    className="newproduct-input newproduct-color-input"
                                    placeholder="Add color"
                                />
                                <button
                                    type="button"
                                    onClick={handleColorAdd}
                                    className="newproduct-color-add-btn"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="newproduct-color-tags">
                                {formData.colorsAvailable.map((color, index) => (
                                    <span key={index} className="newproduct-color-tag">
                                        {color}
                                        <button
                                            type="button"
                                            onClick={() => handleColorRemove(color)}
                                            className="newproduct-color-remove"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Warranty</label>
                            <input
                                type="text"
                                name="warranty"
                                value={formData.warranty}
                                onChange={handleChange}
                                className="newproduct-input"
                                required
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                className="newproduct-input"
                                min="0"
                                required
                            />
                        </div>
                        <textarea
                            name="images"
                            // value={formData.images?.join('\n') || ''}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    images: e.target.value
                                        .split('\n')
                                        .map((url) => url.trim())
                                        .filter((url) => url.length > 0),
                                }))
                            }
                            className="newproduct-textarea"
                            placeholder="Enter image URLs, one per line"
                            rows={4}
                        />
                    </div>

                    <div className="newproduct-form-section">
                        <h3 className="newproduct-section-title">Battery Information</h3>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Battery Type (comma separated)</label>
                            <input
                                type="text"
                                value={formData.battery.type.join(', ')}
                                onChange={(e) => handleArrayChange('battery.type', e.target.value)}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Battery Rating (Ah, comma separated)</label>
                            <input
                                type="text"
                                value={formData.battery.ratingAh.join(', ')}
                                onChange={(e) => handleArrayChange('battery.ratingAh', e.target.value)}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Lithium Rating</label>
                            <input
                                type="number"
                                name="battery.lithiumRating"
                                value={formData.battery.lithiumRating}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Number of VRLA Batteries</label>
                            <input
                                type="number"
                                name="battery>numberOfBatteries>vrla"
                                value={formData.battery.numberOfBatteries.vrla}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Number of Lithium Batteries</label>
                            <input
                                type="number"
                                name="battery>numberOfBatteries>lithium"
                                value={formData.battery.numberOfBatteries.lithium}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Charger Type</label>
                            <input
                                type="text"
                                name="battery.chargerType"
                                value={formData.battery.chargerType}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Charger Rating (A)</label>
                            <input
                                type="number"
                                name="battery.chargerRatingA"
                                value={formData.battery.chargerRatingA}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">VRLA Charging Time</label>
                            <input
                                type="text"
                                name="battery>chargingTime>vrla"
                                value={formData.battery.chargingTime.vrla}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Lithium Charging Time</label>
                            <input
                                type="text"
                                name="battery>chargingTime>lithium"
                                value={formData.battery.chargingTime.lithium}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Mileage per Full Charge</label>
                            <input
                                type="text"
                                name="battery.mileagePerFullCharge"
                                value={formData.battery.mileagePerFullCharge}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                    </div>

                    <div className="newproduct-form-section">
                        <h3 className="newproduct-section-title">Powertrain</h3>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Motor Output (Rated)</label>
                            <input
                                type="number"
                                name="powertrain.motorOutputRated"
                                value={formData.powertrain.motorOutputRated}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Motor Output (Peak)</label>
                            <input
                                type="number"
                                name="powertrain.motorOutputPeak"
                                value={formData.powertrain.motorOutputPeak}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Motor Type</label>
                            <input
                                type="text"
                                name="powertrain.motorType"
                                value={formData.powertrain.motorType}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Top Speed</label>
                            <input
                                type="text"
                                name="powertrain.topSpeed"
                                value={formData.powertrain.topSpeed}
                                onChange={handleChange}
                                className="newproduct-input"
                            />
                        </div>
                    </div>

                    <div className="newproduct-form-section">
                        <h3 className="newproduct-section-title">Additional Features</h3>
                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.digitalSpeedometer"
                                    checked={formData.additionalFeatures.digitalSpeedometer}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Digital Speedometer
                            </label>
                        </div>
                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Reverse Camera</label>
                            <select
                                name="additionalFeatures.reverseCamera"
                                value={formData.additionalFeatures.reverseCamera}
                                onChange={handleChange}
                                className="newproduct-select"
                            >
                                <option value="Yes">Yes</option>
                                <option value="Optional">Optional</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        {/* Add more additional features checkboxes as needed */}
                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.stepneeCover"
                                    checked={formData.additionalFeatures.stepneeCover}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Stepnee Cover
                            </label>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.bluetoothMusicSystem"
                                    checked={formData.additionalFeatures.bluetoothMusicSystem}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Bluetooth Music System
                            </label>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.ledHeadlights"
                                    checked={formData.additionalFeatures.ledHeadlights}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                LED Headlights
                            </label>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.ledTurnTailLights"
                                    checked={formData.additionalFeatures.ledTurnTailLights}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                LED Turn/Tail Lights
                            </label>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.passengerGrabHandles"
                                    checked={formData.additionalFeatures.passengerGrabHandles}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Passenger Grab Handles
                            </label>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.passengerCurtains"
                                    checked={formData.additionalFeatures.passengerCurtains}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Passenger Curtains
                            </label>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.fireExtinguisher"
                                    checked={formData.additionalFeatures.fireExtinguisher}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Fire Extinguisher
                            </label>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.rubberFloorMats"
                                    checked={formData.additionalFeatures.rubberFloorMats}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Rubber Floor Mats
                            </label>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.toolKit"
                                    checked={formData.additionalFeatures.toolKit}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Tool Kit
                            </label>
                        </div>

                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Opening Rear Door</label>
                            <select
                                name="additionalFeatures.openingRearDoor"
                                value={formData.additionalFeatures.openingRearDoor}
                                onChange={handleChange}
                                className="newproduct-select"
                            >
                                <option value="Yes">Yes</option>
                                <option value="Optional">Optional</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.roofCarrier"
                                    checked={formData.additionalFeatures.roofCarrier}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Roof Carrier
                            </label>
                        </div>

                        <div className="newproduct-checkbox-group">
                            <label className="newproduct-checkbox-label">
                                <input
                                    type="checkbox"
                                    name="additionalFeatures.cabinLight"
                                    checked={formData.additionalFeatures.cabinLight}
                                    onChange={handleChange}
                                    className="newproduct-checkbox"
                                />
                                Cabin Light
                            </label>
                        </div>

                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Taxi Light</label>
                            <select
                                name="additionalFeatures.taxiLight"
                                value={formData.additionalFeatures.taxiLight}
                                onChange={handleChange}
                                className="newproduct-select"
                            >
                                <option value="Yes">Yes</option>
                                <option value="Optional">Optional</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="newproduct-form-group">
                            <label className="newproduct-label">Reverse Buzzer</label>
                            <select
                                name="additionalFeatures.reverseBuzzer"
                                value={formData.additionalFeatures.reverseBuzzer}
                                onChange={handleChange}
                                className="newproduct-select"
                            >
                                <option value="Yes">Yes</option>
                                <option value="Optional">Optional</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>

                    <div className="newproduct-form-actions">
                        <button type="submit" className="newproduct-submit-btn">
                            {editingId ? 'Update Product' : 'Add Product'}
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="newproduct-cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <div className="newproduct-list-container">
                <h2 className="newproduct-list-title">Products</h2>
                <div className="newproduct-list">
                    {products.map((product) => (
                        <div key={product._id} className="newproduct-card">
                            <div className="newproduct-card-content">
                                <h3 className="newproduct-card-brand">{product.brand}</h3>
                                <p className="newproduct-card-model">{product.model}</p>
                                <p className="newproduct-card-name">{product.name}</p>
                                <p className="newproduct-card-price">₹{product.price.toLocaleString()}</p>
                                <p className="newproduct-card-stock">
                                    Stock: {product.stock} {product.stock === 1 ? 'unit' : 'units'}
                                </p>
                            </div>
                            <div className="newproduct-card-actions">
                                <button
                                    onClick={() => handleEdit(product)}
                                    className="newproduct-edit-btn"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="newproduct-delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewProductForm;