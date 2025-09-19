type PageAppointmentSuccessProps = {
  searchParams: Promise<{appointmentId: string}>;
};

async function PageAppointmentSuccess(props: PageAppointmentSuccessProps) {
  const params = await props.searchParams;

  return <div>{params.appointmentId}</div>;
}

export default PageAppointmentSuccess;
