const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  return (
    <div>
      <h1>CourseID: {params.courseId}</h1>
    </div>
  );
};

export default CourseIdPage;
