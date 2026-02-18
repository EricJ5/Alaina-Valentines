import { Scene, AUTO, Physics } from 'phaser';
import { Player } from './player';


export class MainScene extends Scene {

	constructor() {
		super("MainScene");
	}
	burger_enemys!: Phaser.Physics.Arcade.Group;
	burger_bullets!: Phaser.Physics.Arcade.Group;
	player!: Player;
	player_bullets!: Phaser.Physics.Arcade.Group;
	keyW!: Phaser.Input.Keyboard.Key;
	keyUP!: Phaser.Input.Keyboard.Key;
	keyS!: Phaser.Input.Keyboard.Key;
	keyDOWN!: Phaser.Input.Keyboard.Key;
	keyA!: Phaser.Input.Keyboard.Key;
	keyD!: Phaser.Input.Keyboard.Key;
	KeyLEFT!: Phaser.Input.Keyboard.Key;
	keyRIGHT!: Phaser.Input.Keyboard.Key;
	start!: boolean;
	introText!: Phaser.GameObjects.Text;
	leftKeys!: Array<Phaser.Input.Keyboard.Key>;
	rightKeys!: Array<Phaser.Input.Keyboard.Key>;
	upKeys!: Array<Phaser.Input.Keyboard.Key>;
	downKeys!: Array<Phaser.Input.Keyboard.Key>;
	burgerDead!: boolean;
	finalText!: Phaser.GameObjects.Text;
	yesText!: Phaser.GameObjects.Text;
	noText!: Phaser.GameObjects.Text;
	thankYouText!: Phaser.GameObjects.Text;


	preload() {
		this.load.atlas('burgers', "assets/burgers.png", "assets/burgers.json");
		this.load.atlas('cats', "assets/cats.png", "assets/cats.json");
		this.load.image('background', 'assets/background.png');
		this.load.image('pickle', 'assets/pickle.png')
	}

	create() {
		this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'background').setDisplaySize(this.cameras.main.width, this.cameras.main.height);
		this.burgerDead = false
		this.start = false
		this.burger_enemys = this.physics.add.group({
			defaultKey: 'burgers',
			defaultFrame: 'burger_enemy',
			maxSize: 40,
			bounceX: 1,
		});
		this.burger_bullets = this.physics.add.group({
			defaultKey: 'burgers',
			defaultFrame: 'burger_bullet'
		})
		this.player_bullets = this.physics.add.group({
			defaultKey: 'pickle'
		})
		this.player = new Player(this, this.cameras.main.centerX, (this.cameras.main.centerY + ((this.cameras.main.centerY / 5 / 2) * 8)), 'cats', 'catback.png');
		this.player.setSpeed(200);
		this.player.setScale(3);
		this.player.setCollideWorldBounds(true);
		this.physics.add.overlap(this.player, this.burger_bullets, (player, bullet) => {
			this.player.health -= 1;
			bullet.destroy()
		}, undefined, this);
		this.player.setBullets(this.player_bullets, this.burger_enemys);
		this.player.setTexture("cats", "catback.png");
		this.player.setRotation(Math.PI / 2);

		if (this.input.keyboard) {
			this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
			this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
			this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
			this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
			this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
			this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
			this.KeyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
			this.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
			this.upKeys = [this.keyW, this.keyUP];
			this.upKeys.forEach((key: Phaser.Input.Keyboard.Key) => {
				key.on('down', () => {
					this.player.fire();
				})
			})
			this.leftKeys = [this.keyA, this.KeyLEFT];


			this.rightKeys = [this.keyD, this.keyRIGHT];

			this.downKeys = [this.keyS, this.keyDOWN];






		}




		this.introText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Use A and D or arrow keys to move \n W or Up arrow is to fire pickles \n Shoot the lie burgers to win", {
			color: "#000000",
			fontSize: "32px",
			align: 'center'
		}).setOrigin(0.5, 0.5);


		this.finalText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Congratulations!!! \n\n Will you be my Valentine?", {
			color: "#000000",
			fontSize: "32px",
			align: 'center'
		}).setOrigin(0.5, 0.5)

		this.finalText.setVisible(false)

		this.yesText = this.add.text(this.cameras.main.centerX - 600, this.cameras.main.centerY - 300, "YES <3", {
			color: "#000000",
			fontSize: "32px",
			align: 'center'

		})

		this.noText = this.add.text(this.cameras.main.centerX + 600, this.cameras.main.centerY - 300, "NO :(", {
			color: "#000000",
			fontSize: "32px",
			align: 'center'
		})


		this.thankYouText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Thank you for playing pookie \n\n I love you very much \n and you're pretty \n and you're the best girlfriend ever \n also you're super smart \n and I am very proud of you \n and you're very sexy \n and you're my favorite girlfriend (I only have one) \n\n", {
			color: "#000000",
			fontSize: "32px",
			align: 'center'
		}).setOrigin(0.5, 0.5);
		this.thankYouText.setVisible(false)

		this.yesText.setVisible(false)
		this.noText.setVisible(false)
		this.physics.add.existing(this.noText);
		this.physics.add.existing(this.yesText);
		this.physics.add.overlap(this.noText, this.player, (text, player) => {
			this.noText.setPosition(Math.random() * this.cameras.main.width, Math.random() * this.cameras.main.height);
		})

		this.physics.add.overlap(this.yesText, this.player, (text, player) => {
			this.noText.setVisible(false)
			this.yesText.setVisible(false)
			this.finalText.setVisible(false)
			this.thankYouText.setVisible(true)
		})

		this.time.addEvent({
			delay: 10000,
			callback: () => {
				this.start = true;
			}
		})

	}


	burgerFire(enemy: Phaser.Physics.Arcade.Sprite) {
		if (this.start) {
			const bullet: Phaser.Physics.Arcade.Sprite = this.burger_bullets.get(enemy.x, enemy.y)
			bullet.setVelocityY((Math.random() * 300) + 100)
		}
	}


	burgerSpawn() {
		const enemy: Phaser.Physics.Arcade.Sprite = this.burger_enemys.get(Math.random() * this.cameras.main.width, - 100);

		if (enemy && enemy.body) {
			enemy.setRotation(Math.PI / 2)
			enemy.setVisible(true)
			enemy.setVelocityY(100)
			this.time.addEvent({
				delay: (Math.random() * (5000 - 1000)) + 1000,
				callback: () => {
					if (enemy.active) {
						enemy.setVelocityY(0)
						enemy.setVelocityX((Math.random() * (300 - 100)) + 100)
						enemy.setCollideWorldBounds(true)

					}
				},
				callbackScope: this
			});
			this.time.addEvent({
				delay: ((Math.random() * (5000 - 3000) + 3000)),
				callback: () => {
					if (enemy.body?.velocity.y == 0)
						this.burgerFire(enemy)
				},
				callbackScope: this,
				loop: true
			})
		}
	}

	xMovementPoll() {
		if (this.leftKeys.some(key => key.isDown)) {
			this.player.setRotation(0)
			this.player.setTexture("cats", "catleft.png");
			this.player.moveLeft();
		}
		if (this.rightKeys.some(key => key.isDown)) {
			this.player.setRotation(0);
			this.player.setTexture("cats", "catright.png");
			this.player.moveRight();
		}
	}
	yMovementPoll() {
		if (this.upKeys.some(key => key.isDown)) {
			this.player.setRotation(Math.PI / 2)
			this.player.setTexture("cats", "catback.png");
			this.player.moveUp();
		}
		if (this.downKeys.some(key => key.isDown)) {
			this.player.setRotation(Math.PI / 2);
			this.player.setTexture("cats", "catback.png");
			this.player.moveDown();
		}

	}
	override update(time: number, delta: number): void {
		this.player.setTexture("cats", "catback.png")
		this.player.setRotation(Math.PI / 2)
		this.player.setVelocity(0)
		if (!this.start) {
			this.burgerSpawn()
		}
		this.xMovementPoll()
		if (this.start && (this.burger_enemys.getLength() == 0) && !this.burgerDead) {
			this.introText.setVisible(false);
			this.finalText.setVisible(true)
			this.yesText.setVisible(true)
			this.noText.setVisible(true)
			this.upKeys.forEach(key => { key.removeAllListeners() })
			this.burgerDead = true
		}
		if (this.burgerDead) {
			this.yMovementPoll()
		}


	}

}
const config: Phaser.Types.Core.GameConfig = {
	type: AUTO,
	width: 1920,
	height: 1080,
	autoCenter: Phaser.Scale.CENTER_BOTH,
	physics: {
		default: 'arcade'
	},
	scene: [MainScene],
	backgroundColor: '#4488aa'
}

const game: Phaser.Game = new Phaser.Game(config)

