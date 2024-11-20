"use client";

import { useCallback, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { newVerification } from "@/actions/new-verification";

export function NewVerificationForm() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = useSearchParams().get("token");

  const onSubmit = useCallback(async () => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }
    await newVerification(token)
      .then((data) => {
        if (data.success) setSuccess(data.success);
        if (data.error) setError(data.error);
      })
      .catch((e) => {
        setError("Something Went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!error && !success && <ScaleLoader height={20} color="lightblue" />}
        {error && !success && <FormError message={error} />}
        {success && !error && <FormSuccess message={success} />}
      </div>
    </CardWrapper>
  );
}
