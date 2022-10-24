import imageio
import gym_2048.envs.game2048_env as game2048_env


def main():
    path = 'replay.gif'
    env = game2048_env.Game2048Env()
    print('Obs: ', env.observation_space)
    print('Action: ', env.action_space)
    obs = env.reset()
    frames = []
    while True:
        action = env.action_space.sample()
        obs, rew, done, info = env.step(action)
        print(action)
        frames.append(env.render('rgb_array'))
        if done:
            break
    imageio.mimsave(path, frames, fps=20)


if __name__ == "__main__":
    main()
