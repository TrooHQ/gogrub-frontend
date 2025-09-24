import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }: any) {

  const userDetails = useSelector((state: any) => state.user);

  const token = userDetails?.userData?.token;

  const navigate = useNavigate();

  if (!token) navigate('/');

  return (
    <div>{children}</div>
  )
}


export function UnProtectedRoutes({ children }: any) {
  const userDetails = useSelector((state: any) => state.user);

  const navigate = useNavigate();
  const token = userDetails?.userData?.token;
  useEffect(() => {
    if (token) navigate('/overview')

  }, [navigate, token])



  return (
    <div>{children}</div>
  )
}

