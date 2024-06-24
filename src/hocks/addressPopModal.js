
import DaumPostcode from "react-daum-postcode";
import '../css/DaumPostModule.css';

const AddressPopModal = (props) => {

    const complete = (data) =>{
        let fullAddress = data.address;
        let zonecode = data.zonecode;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
 

        props.setcompany({
            ...props.company,
            address:fullAddress,
            zonecode:zonecode
        })
    }

    return (
        <div >
            <DaumPostcode
                className="DaumPostModule"
                autoClose
                onComplete={complete} />
        </div>
    );
};

export default AddressPopModal;