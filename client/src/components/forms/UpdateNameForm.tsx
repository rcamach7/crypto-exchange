import { useState } from "react";
import styled from "styled-components";
import { capitalizeFirstLetter } from "../../utilities/helpers";
import EditIcon from "@mui/icons-material/Edit";
import { useGlobalContext } from "../../context/GlobalCryptoContext";
import { updateName } from "../../data/api";
import { setUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../features/hooks";

const FormWrapper = styled.span`
  form {
    display: inline;
  }
`;
interface Props {
  name: string;
}

export const UpdateNameForm = ({ name }: Props) => {
  const { togglePageLoading, handleBannerMessage } = useGlobalContext();
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const [updatedName, setUpdatedName] = useState<string>(name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    togglePageLoading();

    if (!isValidName(updatedName)) return;

    try {
      const user = await updateName(updatedName);

      dispatch(setUser(user));
      setShowForm(false);
      handleBannerMessage("success", "Name has been updated");
      togglePageLoading();
    } catch (error) {
      togglePageLoading();
      handleBannerMessage("error", "Unable to update name");
    }
  };

  const isValidName: (name: string) => boolean = (name) => {
    if (name.length === 0 || name.length < 4) {
      togglePageLoading();
      handleBannerMessage("error", "Name must be at least 4 characters long!");
      return false;
    } else return true;
  };

  const renderForm = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
        />
      </form>
    );
  };

  return (
    <FormWrapper>
      {showForm ? (
        renderForm()
      ) : (
        <span>
          {capitalizeFirstLetter(name)}{" "}
          <EditIcon
            fontSize="small"
            onClick={() => setShowForm(true)}
            sx={{ position: "relative", top: "5px" }}
          />
        </span>
      )}
    </FormWrapper>
  );
};
