import { useFormik } from "formik";
import { boardHouseServices } from "../../services";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../hooks";
import UploadImage from "../UploadImage";
import styles from "./UpdateBoardHouseForm.module.scss";
import classNames from "classNames/bind";
import { ToastContext } from "../../untils/context";

const cx = classNames.bind(styles);

function UpdateBoardHouseForm({
  data,
  id,
  isCreate,
  dataExisted,
  onHide,
  updateData,
}) {
  // const [loading, setLoading] = useState(false);
  const [, , adminData] = useAuth();
  const [imgToDelete, setImgToDelete] = useState(null);
  const navigate = useNavigate();
  const toast = useContext(ToastContext);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length < 5) {
      errors.name = "Must be 5 characters or more";
    }

    if (!values.address) {
      errors.address = "Required";
    } else if (values.address.length < 5) {
      errors.address = "Must be 5 characters or more";
    }

    if (!values.phone) {
      errors.phone = "Please enter your phone number!";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(values.phone)) {
      errors.phone = "Invalid phone number format!";
    }

    if (!values.electricPrice) {
      errors.electricPrice = "Required";
    }

    if (!values.waterPrice) {
      errors.waterPrice = "Required";
    }

    return errors;
  };

  async function handleSubmit(boardHouseId, data) {
    const fileImgs = data.fileImages?.filter((file) => typeof file == "object");
    toast.loading("Updating ... ");

    const res = await boardHouseServices.updateBoardHouse(
      boardHouseId,
      data,
      fileImgs
    );
    if (res.err === 0) {
      toast.dismiss();
      toast.success(res.message);
      Swal.fire({
        title: "Updated successfully. Let's access in dashboard",
        text: "Go to your profile",
        confirmButtonText: "Yes!",
        confirmButtonColor: "rgb(89, 89, 255)",
      }).then((result) => {
        if (result.isConfirmed && isCreate) {
          // navigate(`/admin/profile/${adminData?._id}`);
          window.location.reload();
        } else {
          updateData();
          onHide();
          navigate(`/admin/profile/${adminData?._id}`);
        }
      });
    } else {
      toast.dismiss();
      toast.error(res.message);
    }
  }

  async function handleDeleteImage(img) {
    setImgToDelete(img);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      electricPrice: "",
      waterPrice: "",
      images: [],
      fileImages: [],
    },
    onSubmit: (values) => {
      handleSubmit(id, values);
    },
    validateOnChange: false,
    validate,
  });

  useEffect(() => {
    if (data && !isCreate) {
      formik.setValues({
        _id: data._id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        electricPrice: data.electricPrice,
        waterPrice: data.waterPrice,
        images: data.images,
        fileImages: data.fileImages,
        originalImage: data.images,
      });
    }
  }, []);

  return (
    <div className={cx("wrap", "row p-3")}>
      <form className="col-md-5" onSubmit={formik.handleSubmit}>
        <label htmlFor="name" className="fw-bold">
          Name of board house:
        </label>
        <input
          className="form-control "
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? (
          <div className="mb-3 text-danger">{formik.errors.name}</div>
        ) : (
          <div className="mb-3"></div>
        )}

        <label htmlFor="address" className="fw-bold">
          Address:{" "}
        </label>
        <input
          className="form-control  "
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        {formik.errors.address ? (
          <div className="mb-3 text-danger">{formik.errors.address}</div>
        ) : (
          <div className="mb-3"></div>
        )}

        <label htmlFor="phone" className="fw-bold">
          Phone:{" "}
        </label>
        <input
          className="form-control "
          id="phone"
          name="phone"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone ? (
          <div className="mb-3 text-danger">{formik.errors.phone}</div>
        ) : (
          <div className="mb-3"></div>
        )}

        <label htmlFor="electricPrice" className="fw-bold">
          Electric Price:{" "}
        </label>
        <input
          className="form-control "
          id="electricPrice"
          name="electricPrice"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.electricPrice}
        />
        {formik.errors.electricPrice ? (
          <div className="mb-3 text-danger">{formik.errors.electricPrice}</div>
        ) : (
          <div className="mb-3"></div>
        )}

        <label htmlFor="waterPrice" className="fw-bold">
          Water Price:{" "}
        </label>
        <input
          className="form-control "
          id="waterPrice"
          name="waterPrice"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.waterPrice}
        />
        {formik.errors.waterPrice ? (
          <div className="mb-3 text-danger">{formik.errors.waterPrice}</div>
        ) : (
          <div className="mb-3"></div>
        )}

        {/* <div className="my-3">
          <WidgetCloudinary formik={formik}></WidgetCloudinary>
        </div> */}

        <button
          className="btn btn-primary m-auto"
          type="submit"
          disabled={formik.values.images?.length >= 2 ? false : true}
        >
          Submit
        </button>
      </form>
      <div className="col-md-7 d-flex flex-column justify-content-center align-items-center">
        {formik.values.images?.length > 0 ? (
          <Carousel
            selectedItem={formik.values.images?.length - 1}
            className={cx("carousel-control")}
            showArrows={true}
            showThumbs={false}
            emulateTouch={true}
            showIndicators={true}
            infiniteLoop={true}
            // interval={3000}
            // autoPlay={true}
          >
            {formik.values.images.map((img, index) => (
              <div className={cx("item-img")} key={index}>
                <span className={cx("btn-delete-img")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    style={{ width: "25px" }}
                    onClick={() => handleDeleteImage(img)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
                <img className={cx("img-uploaded")} key={index} src={img}></img>
              </div>
            ))}
          </Carousel>
        ) : (
          ""
        )}

        {formik.values.images?.length < 2 && (
          <div className="alert alert-light rounded-3 shadow text-danger fst-italic fw-bold">
            You must upload at least two images. If you don&apos;t, you
            can&apos;t update it.
          </div>
        )}

        <UploadImage
          formik={formik}
          dataExisted={dataExisted}
          isUpdate={true}
          imgToDelete={imgToDelete}
          forBoardHouse={true}
        ></UploadImage>
      </div>
    </div>
  );
}

UpdateBoardHouseForm.propTypes = {
  data: PropTypes.object,
  id: PropTypes.string,
  room: PropTypes.object,
  isCreate: PropTypes.bool,
  onDisableClose: PropTypes.func,
  dataExisted: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  onHide: PropTypes.func,
  updateData: PropTypes.func,
};

export default UpdateBoardHouseForm;
