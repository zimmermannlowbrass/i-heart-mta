"""fill out user columns

Revision ID: 99af9c7b8270
Revises: 1c4c6a1fb6d6
Create Date: 2023-07-28 08:04:42.903319

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '99af9c7b8270'
down_revision = '1c4c6a1fb6d6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.add_column(sa.Column('forwardDirection', sa.Boolean(), nullable=True))
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_trips_user_id_users'), 'users', ['user_id'], ['id'])

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('borough', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('_password_hash', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('_password_hash')
        batch_op.drop_column('description')
        batch_op.drop_column('borough')

    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_trips_user_id_users'), type_='foreignkey')
        batch_op.drop_column('user_id')
        batch_op.drop_column('forwardDirection')

    # ### end Alembic commands ###