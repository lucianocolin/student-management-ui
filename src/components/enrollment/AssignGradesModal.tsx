import { useEffect, useState } from "react";
import type { IEnrollmentResponse } from "../../interfaces/enrollment/IEnrollmentResponse";

interface IAssignGradesModalProps {
  isOpen: boolean;
  enrollments: IEnrollmentResponse[] | undefined;
  onClose: () => void;
  handleAssignGrade: (enrollmentId: string, grade: number) => Promise<void>;
}

const AssignGradesModal = ({
  isOpen,
  enrollments,
  onClose,
  handleAssignGrade,
}: IAssignGradesModalProps) => {
  const [grades, setGrades] = useState<{ [id: string]: number | null }>({});

  useEffect(() => {
    if (isOpen && enrollments) {
      const initialGrades: { [id: string]: number | null } = {};
      enrollments.forEach((enrollment) => {
        initialGrades[enrollment.id] = enrollment.grade ?? null;
      });
      setGrades(initialGrades);
    }
  }, [isOpen, enrollments]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center w-full h-full">
      <div
        className="bg-white p-5 rounded-lg shadow-lg w-[30%] h-auto opacity-100 flex flex-col"
        data-testid="assign-grades-modal"
      >
        <h1
          className="text-2xl font-bold mb-4 text-center"
          data-testid="assign-grades-title"
        >
          Assign Grades
        </h1>
        {
          <div className="flex flex-col gap-5 py-5">
            {!enrollments || enrollments.length === 0 ? (
              <h2 data-testid="no-enrollments-message">
                This student hasn't enrolled in any subjects
              </h2>
            ) : (
              enrollments.map((enrollment) => {
                console.log('enrollment: ', enrollment);
                return (
                  <div key={enrollment.id} className="text-black">
                    <p className="font-bold" data-testid="subject-name">
                      {enrollment.subject?.name}
                    </p>
                    <div className="w-full flex justify-between">
                      <input
                        type="number"
                        placeholder="Grade"
                        value={grades[enrollment.id] ?? ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          setGrades((prev) => ({
                            ...prev,
                            [enrollment.id]:
                              value === "" ? null : Number(value),
                          }));
                        }}
                        className="border border-gray-400 rounded-md px-2 py-1 w-full mr-5"
                        data-testid="grade-input"
                      />
                      <button
                        className={
                          !grades[enrollment.id]
                            ? `btn bg-gray-500 text-white font-bold py-1 px-3 rounded`
                            : `btn bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded`
                        }
                        onClick={() =>
                          handleAssignGrade(
                            enrollment.id,
                            grades[enrollment.id] ?? 0
                          )
                        }
                        disabled={!grades[enrollment.id]}
                        data-testid="assign-grade-btn"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        }
        <div className="flex justify-end mt-3">
          <button
            onClick={onClose}
            className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded w-full"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignGradesModal;
