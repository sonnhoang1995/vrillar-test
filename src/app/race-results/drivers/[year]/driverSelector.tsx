type Driver = {
    racerId: string;
    racerName: string;
};

export default function DriverSelector(props: any) {
    const selectedDriver: string = props.selected;
    const drivers: Driver[] = props.drivers;
    const handleChangeResult = props.handleChangeResult;

    return (
        <div className="row mb-4">
            <div className="col-12">
                <select
                    className="form-select form-select-lg"
                    onChange={(e) => handleChangeResult(e.target.value)}
                    style={{
                        width: "50%",
                        textAlign: "center",
                        marginLeft: "25%",
                        borderColor: "lightgray"
                    }}
                    defaultValue={selectedDriver == "all" ? "all" : selectedDriver}
                >
                    <option key="all" value="all">
                        All
                    </option>
                    {drivers.map((driver) => {
                        return (
                            <option
                                key={`${driver.racerId.split("/")[0]}`}
                                value={`${driver.racerId.split("/")[0]}`}
                            >
                                {driver.racerName}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}
