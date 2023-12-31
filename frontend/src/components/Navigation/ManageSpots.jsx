import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchUserSpots, deleteUserSpot } from '../../store/allSpots';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import { useModal } from '../../context/Modal';
import './ManageSpot.css'
export default function ManageSpotsPage() {
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();
    const userId = useSelector(state => state.session.user.id)
    const userSpots = useSelector(state => state.getSpots);
    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [dispatch, userId]);

    if (!userSpots) {
        return null
    }

    const handleSpotDelete = async (spotId) => {
        await dispatch(deleteUserSpot(spotId));
        closeModal();
        dispatch(fetchUserSpots());
    };

    const openDeleteModal = (spotId) => {
        setModalContent(
            <DeleteSpotModal
                onConfirm={() => handleSpotDelete(spotId)}
                onCancel={closeModal}
            />
        );
    };

    if (!userSpots) {
        return null;
    }

    return (
        <div className='manage-spot-container'>
            <h1 className='manage'>Manage Your Spots</h1>
            {userId && <button className='create-button'><NavLink to="/create-spot" className='button-link'>Create a New Spot</NavLink></button>}
            <div className='manage-spot'>
                {userId && Object.values(userSpots).length > 0 &&
                    (
                        Object.values(userSpots).map(spot => (
                            <div key={spot.id} className="spot-tile">
                                <Link to={`/spots/${spot.id}`} key={spot.id} className="spot-tile-link">
                                    <img src={spot.previewImage} alt={spot.name} />
                                    <div className='flex'>
                                        <span>{spot.city}, {spot.state}</span>
                                        <div>
                                        <span className="fa fa-star checked"></span>
                                        <span>{spot.avgRating ? spot.avgRating : 'New'}</span>
                                        </div>
                                    </div>
                                    <div className='price'><span className="bold">$</span><span className="bold">{spot.price}</span> night</div>
                                </Link>
                                <div className="spot-actions">
                                    <button><NavLink to={`/update-spot/${spot.id}`} className='button-link'>Update</NavLink></button>
                                    <button className = 'deletespot-button' onClick={() => openDeleteModal(spot.id)}>Delete</button>
                                </div>
                            </div>
                        )))}
            </div>
        </div>
    )
}
