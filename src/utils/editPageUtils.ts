import {
  ICarCreateUpdate,
  ISponsorCreateUpdate,
  IUserCreateUpdate,
} from "./interfaces";
import sponsorAPI from "../http/sponsorAPI";
import { ADMIN_ROUTE } from "./consts";
import { NavigateFunction } from "react-router-dom";
import carAPI from "../http/carAPI";
import userAPI from "../http/userAPI";

export const saveSponsor = async (
  sponsorId: string | undefined,
  data: ISponsorCreateUpdate,
  navigate: NavigateFunction,
  handleCloseDialog: () => void
) => {
  const response = sponsorId
    ? await sponsorAPI.changeSponsor(sponsorId, data)
    : await sponsorAPI.createSponsor(data);
  if (response) {
    navigate(ADMIN_ROUTE);
  }
  handleCloseDialog();
};

export const deleteSponsor = async (
  sponsorId: string | undefined,
  navigate: NavigateFunction,
  handleCloseDialog: () => void
) => {
  if (sponsorId) {
    const response = await sponsorAPI.deleteSponsor(sponsorId);
    if (response) {
      navigate(ADMIN_ROUTE);
    }
  }
  handleCloseDialog();
};

export const saveCar = async (
  carId: string | undefined,
  data: ICarCreateUpdate,
  navigate: NavigateFunction,
  handleCloseDialog: () => void
) => {
  const response = carId
    ? await carAPI.changeCar(carId, data)
    : await carAPI.createCar(data);
  if (response) {
    navigate(ADMIN_ROUTE);
  }
  handleCloseDialog();
};

export const deleteCar = async (
  carId: string | undefined,
  navigate: NavigateFunction,
  handleCloseDialog: () => void
) => {
  if (carId) {
    const response = await carAPI.deleteCar(carId);
    if (response) {
      navigate(ADMIN_ROUTE);
    }
  }
  handleCloseDialog();
};

export const saveUser = async (
  userId: string | undefined,
  data: IUserCreateUpdate,
  navigate: NavigateFunction,
  handleCloseDialog: () => void
) => {
  const response = userId
    ? await userAPI.changeUser(userId, data)
    : await userAPI.createUser(data);
  if (response) {
    navigate(ADMIN_ROUTE);
  }
  handleCloseDialog();
};

export const deleteUser = async (
  userId: string | undefined,
  navigate: NavigateFunction,
  handleCloseDialog: () => void
) => {
  if (userId) {
    const response = await userAPI.deleteUser(userId);
    if (response) {
      navigate(ADMIN_ROUTE);
    }
  }
  handleCloseDialog();
};
