namespace jacdac {
    export class ServoService extends ActuatorService {
        servo: servos.Servo;
        constructor(name: string, servo: servos.Servo) {
            super(name, jacdac.SERVO_DEVICE_CLASS, 8, 2);
            this.servo = servo;
        }

        protected handleStateChanged() {
            if (!this.enabled)
                this.servo.stop();
            else {
                const [angle, pulse] = this.state.unpack("hh")
                if (pulse)
                    this.servo.setPulse(pulse);
                this.servo.setAngle(angle);
            }
        }
    }

    // use multiple instances of ServoService if more than one servo is required
}