import React from "react";
import { Button } from "antd"

function MainPage({logout}) {
    function onClick(){
        logout()
    }

    return (
        <Button type="primary" htmlType="submit" onClick={onClick}>
            Log out
        </Button>
    );
}

export { MainPage }