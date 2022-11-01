import { Avatar } from "@mui/material";
import { useState, useEffect, FC } from "react";
import { useGlobalContext, ResponseType } from "../../context/";
import { updateUserImage } from "../../api/api";
import { setUser, useAppDispatch } from "../../features/";

interface Props {
  currentProfilePicture: string;
}

export const UpdateProfileImageForm: FC<Props> = ({
  currentProfilePicture,
}) => {
  const { togglePageLoading, handleBannerMessage } = useGlobalContext();
  const dispatch = useAppDispatch();

  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    const updatePicture = async () => {
      togglePageLoading();
      try {
        const user = await updateUserImage(profilePicture);
        dispatch(setUser(user));
        togglePageLoading();
        handleBannerMessage(
          ResponseType.Success,
          "Successfully updated profile image"
        );
      } catch (error) {
        togglePageLoading();
        handleBannerMessage(ResponseType.Error, "Unable to update image");
      }
    };

    if (profilePicture) {
      updatePicture();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilePicture]);

  return (
    <form>
      <label htmlFor="fileUpload">
        <Avatar
          sx={{ border: "solid black 1px" }}
          aria-label="recipe"
          alt={currentProfilePicture}
          src={currentProfilePicture}
        />
      </label>

      {/* input element not displayed as our fileUpload icon will be used instead */}
      <input
        style={{ display: "none" }}
        id="fileUpload"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) =>
          setProfilePicture(e.target.files ? e.target.files[0] : null)
        }
      />
    </form>
  );
};
