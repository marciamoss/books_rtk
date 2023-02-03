import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchUserQuery } from '../store';
import Button from "../components/Button";

function useCheckUser(authUserId, userAdded) {
    const { refetch } = useFetchUserQuery(authUserId);
    const [saveButton, setSaveButton] = useState('');
    const [saveButtonCn, setSaveButtonCn] = useState('');
    const [userInDb, setUserInDb] = useState(false);

    const {signedIn} = useSelector((state) => {
        return {
            signedIn: state.authData.signedIn
        };
    });
    useEffect(() => {
        const checkUser  = async () => {
            try{
                const inDb =  (await refetch(authUserId).unwrap());
                if(inDb.length>0 || userAdded) {
                    setUserInDb(inDb.length>0);
                    setSaveButtonCn('float-left mr-3');
                    setSaveButton(<Button className="font-bold text-black border-0 mt-3 mb-2 bg-blue-200">Save</Button>);
                }
            } catch (error) {setSaveButton('');setSaveButtonCn('mb-2');};
        };
        if (signedIn) {
            checkUser();
        } else {
            setSaveButton('');
            setSaveButtonCn('mb-2');
        }
    },[signedIn, refetch, authUserId, userAdded])

    return {
        saveButton,
        saveButtonCn,
        userInDb
    }
}
export default useCheckUser;

