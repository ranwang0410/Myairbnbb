import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { fetchUserSpots,deleteUserSpot } from '../../store/allSpots';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import { useModal } from '../../context/Modal';

export default function ManageSpotsPage() {
    const dispatch = useDispatch();
    const { setModalContent, closeModal } = useModal();
    const userId = useSelector(state => state.session.user.id)
    // console.log('this is userId->',userId)
    const userSpots = useSelector(state => state.getSpots);
    // console.log('this is useSpot=',userSpots)

    useEffect(() => {
        dispatch(fetchUserSpots())

    }, [dispatch,userId]);

    if (!userSpots) {
        return null
    }
    const handleSpotDelete = async (spotId) => {
        // console.log("Deleting spot with ID:", spotId);
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

    if(!userSpots){
        return null;
    }
    return (
        <div>
            <h1>Manage Your Spots</h1>
            {userId && Object.values(userSpots).length === 0 ? (
                <button><NavLink to="/create-spot">Create a New Spot</NavLink></button>
            ) : (
                Object.values(userSpots).map(spot => (
                    <div key={spot.id} className="spot-tile">
                    <Link to={`/spots/${spot.id}`} key={spot.id} className="spot-tile-link">
                            <img src={spot.previewImage} alt={spot.name} />
                            <div>{spot.city}, {spot.state}</div>
                            <div>${spot.price} night</div>
                            <div>{spot.avgRating}</div>
                    </Link>
                            <div className="spot-actions">

                                <button><NavLink to={`/update-spot/${spot.id}`}>Update</NavLink></button>
                                <button onClick={() => openDeleteModal(spot.id)}>Delete</button>
                            </div>
                        </div>
                )))}
        </div>
    )
}
