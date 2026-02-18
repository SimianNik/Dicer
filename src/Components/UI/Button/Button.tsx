import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "danger";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
};

function cx(...parts: Array<string | undefined | false>) {
    return parts.filter(Boolean).join(" ");
}

export function Button({variant = "primary",size = "md",className,...rest}: Props) {
    return (
        <button
            className={cx(styles.btn, styles[variant], styles[size], className)}
            {...rest}
        />
    );
}
