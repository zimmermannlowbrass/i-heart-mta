"""m2m relationship

Revision ID: b60005b26acc
Revises: 8a4d5c0365ce
Create Date: 2023-07-31 11:28:04.494146

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b60005b26acc'
down_revision = '8a4d5c0365ce'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.add_column(sa.Column('start_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('stop_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('fk_trips_subwaystops_id_subwaystops', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_trips_stop_id_subwaystops'), 'subwaystops', ['stop_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_trips_start_id_subwaystops'), 'subwaystops', ['start_id'], ['id'])
        batch_op.drop_column('subwaystops_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trips', schema=None) as batch_op:
        batch_op.add_column(sa.Column('subwaystops_id', sa.INTEGER(), nullable=True))
        batch_op.drop_constraint(batch_op.f('fk_trips_start_id_subwaystops'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_trips_stop_id_subwaystops'), type_='foreignkey')
        batch_op.create_foreign_key('fk_trips_subwaystops_id_subwaystops', 'subwaystops', ['subwaystops_id'], ['id'])
        batch_op.drop_column('stop_id')
        batch_op.drop_column('start_id')

    # ### end Alembic commands ###