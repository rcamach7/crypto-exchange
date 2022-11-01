import { useState, FC } from "react";
import { capitalizeFirstLetter } from "../../utilities/helpers";
import { Edit as EditIcon, Cancel as CancelIcon } from "@mui/icons-material/";
import { ResponseType, useGlobalContext } from "../../context/";
import { updateName } from "../../api/api";
import { useAppDispatch, setUser } from "../../features/";
import { Box, IconButton } from "@mui/material";

interface Props {
  name: string;
}

export const UpdateNameForm: FC<Props> = ({ name }) => {
  const { togglePageLoading, handleBannerMessage } = useGlobalContext();
  const dispatch = useAppDispatch();

  const [showForm, setShowForm] = useState(false);
  const [updatedName, setUpdatedName] = useState<string>(name);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    togglePageLoading();

    if (!isNameValid(updatedName)) return;

    try {
      const user = await updateName(updatedName);

      dispatch(setUser(user));
      setShowForm(false);
      handleBannerMessage(ResponseType.Success, "Name has been updated");
      togglePageLoading();
    } catch (error) {
      togglePageLoading();
      handleBannerMessage(ResponseType.Error, "Unable to update name");
    }
  };

  const isNameValid: (name: string) => boolean = (name) => {
    if (name.length === 0 || name.length < 4) {
      togglePageLoading();
      handleBannerMessage(
        ResponseType.Error,
        "Name must be at least 4 characters long!"
      );
      return false;
    }
    return true;
  };

  return (
    <Box component="span">
      {showForm ? (
        <>
          <form style={{ display: "inline" }} onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              style={{ width: "10em" }}
            />
          </form>
          <IconButton onClick={() => setShowForm((SF) => !SF)}>
            <CancelIcon fontSize="small" />
          </IconButton>
        </>
      ) : (
        <>
          {capitalizeFirstLetter(name)}{" "}
          <IconButton onClick={() => setShowForm((SF) => !SF)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </>
      )}
    </Box>
  );
};
