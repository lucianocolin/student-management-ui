import { AxiosError } from "axios";
import RegistrationRequestsTable from "../../components/register/table/RegistrationRequestsTable";
import {
  useApproveRegistrationRequest,
  useGetNotApprovedUsers,
} from "../../services/auth/useAuth";
import toast from "react-hot-toast";
import {
  APPROVE_REGISTRATION_REQUEST_ERROR,
  APPROVE_REGISTRATION_REQUEST_SUCCESS,
} from "../../constants/auth/registration-request-messages";
import { useQueryClient } from "@tanstack/react-query";

const RegistrationRequests = () => {
  const { data: notApprovedUsers, isPending: isNotApprovedUsersPending } =
    useGetNotApprovedUsers();
  const { mutateAsync: approve, isPending: isApprovePending } =
    useApproveRegistrationRequest();
  const queryClient = useQueryClient();

  const handleApproveRegistrationRequest = async (id: string) => {
    try {
      await approve(id);

      await queryClient.invalidateQueries({ queryKey: ["not-approved-users"] });
      toast.success(APPROVE_REGISTRATION_REQUEST_SUCCESS);
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : APPROVE_REGISTRATION_REQUEST_ERROR;

      toast.error(errorMessage);
    }
  };

  return (
    <>
      <h1
        className="text-center text-2xl font-bold py-5"
        data-testid="registration-requests-title"
      >
        Registration Requests
      </h1>
      <div className="container mx-auto">
        <RegistrationRequestsTable
          notApprovedUsers={notApprovedUsers ?? []}
          isNotApprovedUsersPending={isNotApprovedUsersPending}
          isApprovePending={isApprovePending}
          handleApproveRegistrationRequest={handleApproveRegistrationRequest}
        />
      </div>
    </>
  );
};

export default RegistrationRequests;
