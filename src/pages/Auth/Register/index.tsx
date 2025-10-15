import { useState, type ChangeEvent, type FormEvent } from "react";
import styled from "styled-components";

type FormData = {
  username: string;
  email: string;
  password: string;
};

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e8f4ff;
  padding: 32px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #101828;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: #475467;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
  color: #344054;
`;

const Input = styled.input`
  height: 48px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid #d0d5dd;
  font-size: 16px;
  color: #101828;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #3478f6;
    box-shadow: 0 0 0 4px rgba(52, 120, 246, 0.15);
    outline: none;
  }

  &::placeholder {
    color: #98a2b3;
  }
`;

const SubmitButton = styled.button`
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #3478f6;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;

  &:hover {
    background: #2364d9;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: #98a2b3;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ $tone: "success" | "error" }>`
  margin: 0;
  font-size: 14px;
  color: ${({ $tone }) => ($tone === "success" ? "#039855" : "#d92d20")};
  background: ${({ $tone }) =>
    $tone === "success" ? "rgba(3, 152, 85, 0.1)" : "rgba(217, 45, 32, 0.12)"};
  border-radius: 12px;
  padding: 12px 14px;
`;

function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("http://35.216.19.71:8000/api/v1/auth/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let payload: unknown = null;
      try {
        payload = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (parseError) {
        // Non-JSON responses are treated as plain failures.
      }

      if (!response.ok) {
        const serverMessage =
          payload && typeof payload === "object" && "message" in payload
            ? String((payload as { message: unknown }).message)
            : payload && typeof payload === "object" && "detail" in payload
              ? String((payload as { detail: unknown }).detail)
              : "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.";
        setFeedback({ type: "error", text: serverMessage });
        return;
      }

      setFeedback({
        type: "success",
        text: "회원가입이 완료되었습니다! 이제 로그인해 주세요.",
      });
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      setFeedback({
        type: "error",
        text: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Card>
        <TitleBlock>
          <Title>회원가입</Title>
          <Subtitle>계정을 만들고 게임을 시작해 보세요.</Subtitle>
        </TitleBlock>

        {feedback ? <Message $tone={feedback.type}>{feedback.text}</Message> : null}

        <Form onSubmit={handleSubmit}>
          <Field>
            사용자 이름
            <Input
              name="username"
              type="text"
              placeholder="닉네임을 입력하세요"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </Field>
          <Field>
            이메일
            <Input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </Field>
          <Field>
            비밀번호
            <Input
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </Field>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "처리 중..." : "가입하기"}
          </SubmitButton>
        </Form>
      </Card>
    </PageContainer>
  );
}

export default RegisterPage;
