import Phaser from 'phaser'
export class Player extends Phaser.Physics.Arcade.Sprite {
	public health: number
	private bullets!: Phaser.Physics.Arcade.Group;
	private leftSpeed!: number
	private rightSpeed!: number
	private upSpeed!: number
	private downSpeed!: number
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
		super(scene, x, y, texture, frame);
		this.health = 100;
		scene.add.existing(this);
		scene.physics.add.existing(this)
	}

	moveLeft() {
		this.setVelocityX(this.leftSpeed);
	}

	moveRight() {
		this.setVelocityX(this.rightSpeed);
	}

	moveUp() {
		this.setVelocityY(this.upSpeed);
	}
	moveDown() {
		this.setVelocityY(this.downSpeed)
	}

	setLeftSpeed(speed: number) {
		this.leftSpeed = speed;
	}
	setRightSpeed(speed: number) {
		this.rightSpeed = speed;
	}
	setUpSpeed(speed: number) {
		this.upSpeed = speed;
	}
	setDownSpeed(speed: number) {
		this.downSpeed = speed;
	}
	setSpeedX(speed: number) {
		this.leftSpeed = -speed;
		this.rightSpeed = speed;

	}
	setSpeedY(speed: number) {
		this.upSpeed = -speed;
		this.downSpeed = speed;

	}
	setSpeed(speed: number) {
		this.leftSpeed = -speed;
		this.rightSpeed = speed;
		this.upSpeed = -speed;
		this.downSpeed = speed;

	}
	resetX() {
		this.setVelocityX(0);
	}

	resetY() {
		this.setVelocityY(0);
	}
	setBullets(bullets: Phaser.Physics.Arcade.Group, targets: Phaser.Physics.Arcade.Group) {
		this.bullets = bullets


		this.scene.physics.add.overlap(this.bullets, targets, (bullet, enemy) => {

			enemy.destroy();
			bullet.destroy();
		})
	}
	fire(rotate?: boolean, texture?: string, frame?: string) {
		const bullet: Phaser.Physics.Arcade.Sprite = this.bullets.get(this.x, this.y);
		bullet.setGravityY(-200);
		if (texture) {
			this.setTexture(this.scene.textures.get(texture).key, frame);

		}
		if (rotate) {
			bullet.setAngularVelocity(90);
		}

	}

}
